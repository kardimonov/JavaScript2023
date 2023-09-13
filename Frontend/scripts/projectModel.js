class ProjectModel {
    id = 0;  
    name = "";
    walls = [];
    currentWall = null;  
    samples = [];
    images = [];

    constructor(view, modalView, ajaxService) {
        this.view = view;
        this.modalView = modalView;
        this.ajaxService = ajaxService;
    }
    showSelectProjectModal() {
        this.modalView.showSelectProjectModal();
    }
    openProject = async() => {
        let projects = await this.ajaxService.getAllProjects();         
        this.modalView.fillSelectProjectModalWithData(projects);         
    }
    downloadProject = async(id) => {
        let res = await this.ajaxService.getProjectById(id);
        this.id = res.id;
        this.name = res.name;
        if (this.currentWall) {
            this.images = [];
            this.samples = [];
            this.walls = [];
            this.currentWall = null;
            this.view.removeWall();
            this.view.removeAllStocks();
        }
        if (res.samples && res.samples.length > 0) {
            for (const sample of res.samples) {
                let sampleModel = new SampleModel(sample.id, sample.width, sample.height, sample.projectId);
                sampleModel.imageId = sample.imageId ?? "";
                this.samples.push(sampleModel);
                this.view.showNewSample(sampleModel);
            }
        }        
        for (const wall of res.walls) {
            let wallModel = new WallModel(wall.id, wall.width, wall.height, wall.name, wall.projectId);
            for (const tile of wall.tiles) {
                let tileModel = new TileModel(tile.id, tile.width, tile.height, tile.wallId);
                tileModel.posX = tile.posX;
                tileModel.posY = tile.posY;
                tileModel.imageId = tile.imageId ?? "";
                wallModel.tiles.push(tileModel);
            }
            this.walls.push(wallModel);
        }
        this.currentWall = this.walls.find(i => i.name == "front-wall");        
        this.view.showWall(this.currentWall);
        if (this.currentWall.tiles.length > 0) {
            for (const tile of this.currentWall.tiles) {
                this.view.showTile(tile, false);
            }            
        }
        if (res.images && res.images.length > 0) {
            for (const image of res.images) {
                let imgModel = new ImageModel(image.id, image.projectId);
                imgModel.name = image.name;
                imgModel.height = image.height;
                imgModel.width = image.width;                
                let file = await this.ajaxService.getImageById(image.id); 
                if (file) {
                    //((file1, imgModel1) => {
                    let reader = new FileReader();                           
                    reader.onloadend = (event) => {
                        imgModel.base64 = event.target.result;  // base64 
                        this.images.push(imgModel);
                        this.view.showNewImage(imgModel.id, imgModel.width, imgModel.height, imgModel.name, imgModel.base64);
                                                
                        let paintedSamples = this.samples.filter(i => i.imageId === imgModel.id);
                        for (const paintedSample of paintedSamples) {
                            this.view.updateElementColor(paintedSample.id, imgModel.base64);
                        }     
                        let paintedTiles = this.currentWall.tiles.filter(i => i.imageId === imgModel.id);
                        for (const paintedTile of paintedTiles) {
                            this.view.updateElementColor(paintedTile.id, imgModel.base64);
                        }                   
                    }
                    reader.readAsDataURL(file);   
                    //})(file, imgModel);
                }            
                else {
                    this.view.showNewImage(imgModel.id, imgModel.width, imgModel.height, imgModel.name);
                }  
            }
        }        
    }
    createWelcomeModal() {
        this.modalView.showWelcomeModal();
    }
    createProject() {
        this.modalView.closeModal();     
        this.modalView.showRoomSizeModal();
    }
    saveProject() {
        this.ajaxService.saveProject(this);
        if (this.images.length > 0) {
            for (const image of this.images) {
                this.ajaxService.saveImage(image);
            }
        }
    }        
    closeModal() {
        this.modalView.closeModal();
    }    
    setRoomDimensions(length, width, height, projectName) {
        if (this.currentWall) {
            this.images = [];
            this.samples = [];
            this.walls = [];
            this.currentWall = null;
            this.view.removeWall();
            this.view.removeAllStocks();
        }
        this.id = `p${this.uuidv4()}`;  
        this.name = projectName;

        let frontWall = new WallModel(`w${this.uuidv4()}`, width, height, "front-wall", this.id);
        this.currentWall = frontWall;
        this.walls.push(frontWall);
        let backWall = new WallModel(`w${this.uuidv4()}`, width, height, "back-wall", this.id);
        this.walls.push(backWall);
        let leftWall = new WallModel(`w${this.uuidv4()}`, length, height, "left-wall", this.id);
        this.walls.push(leftWall);
        let rightWall = new WallModel(`w${this.uuidv4()}`, length, height, "right-wall", this.id);
        this.walls.push(rightWall);
        this.view.showWall(this.currentWall);        
    }
    changeWall(selectedTabId, className) {
        let index = this.walls.findIndex(i => i.name == selectedTabId);
        this.currentWall = this.walls[index];
        this.view.removeWall();
        this.view.removeFromClassList(className);
        this.view.showWall(this.currentWall);        
        if (this.currentWall.tiles.length > 0) {
            for (const tile of this.currentWall.tiles) {
                let imgBase64 = "";
                if (tile.imageId) {
                    imgBase64 = this.images.find(i => i.id == tile.imageId).base64;
                    this.view.showTile(tile, false, imgBase64);
                }
                else {
                    this.view.showTile(tile, false);
                }                
            }            
        }
    }
    changeStock(selectedTabId) {
        this.view.changeStockTab(selectedTabId);
    }
    changeTileEditTab(selectedTabId) {
        this.modalView.changeTileEditTab(selectedTabId);
    }
    createTile() {
        let tile = new TileModel(`t${this.uuidv4()}`, global.tileWidth, global.tileHeight, this.currentWall.id);
        tile.posX = Math.round((this.currentWall.width - global.tileWidth) / 2);
        this.currentWall.tiles.push(tile);        
        this.view.showTile(tile, true);
    }
    createTileFromSample(dataId) {
        let sample = this.samples.find(i => i.id == dataId);
        let tile = new TileModel(`t${this.uuidv4()}`, sample.width, sample.height, this.currentWall.id);
        tile.posX = Math.round((this.currentWall.width - global.tileWidth) / 2);        
        this.currentWall.tiles.push(tile); 
        let imgBase64 = "";
        if (sample.imageId) {
            tile.imageId = sample.imageId;
            imgBase64 = this.images.find(i => i.id == sample.imageId).base64;
            this.view.showTile(tile, true, imgBase64);
        }
        else {
            this.view.showTile(tile, true);
        }   
    }
    createTileEditModal(dataId) {
        let tile = this.currentWall.tiles.find(i => i.id == dataId);
        let tileDown = this.currentWall.height - tile.posY - tile.height;
        this.modalView.showTileEditModal(tile.posX, tileDown, tile.width, tile.height, tile.id);
    }
    editTile(dataId, width, height, left, down) {
        let tile = this.currentWall.tiles.find(i => i.id == dataId);
        tile.width = width > this.currentWall.width ? this.currentWall.width : width;
        tile.height = height > this.currentWall.height ? this.currentWall.height : height;       
        tile.posX = left; 
        if (tile.posX > this.currentWall.width - tile.width) {
            tile.posX = this.currentWall.width - tile.width;
        }
        tile.posY = this.currentWall.height - down - tile.height;
        if (tile.posY > this.currentWall.height - tile.height) {
            tile.posY = this.currentWall.height - tile.height;
        }   
        else if (tile.posY < 0) {
            tile.posY = 0;
        }  
        this.view.updateTile(tile);
    }
    
    removeTile(dataId) {
        this.currentWall.tiles.splice(this.currentWall.tiles.findIndex(i => i.id == dataId), 1);
        this.view.removeHighlightedElement(dataId);
    }    
    highlightBlock(dataId, className) {
        this.view.addToClassList(dataId, className);
    }
    unhighlightBlock(className) {
        this.view.removeFromClassList(className);
    }

    moveTileLeft(dataId) {
        let index = this.currentWall.tiles.findIndex(i => i.id == dataId);
        let tile = this.currentWall.tiles[index];
  
        let tiles = this.currentWall.tiles.filter(i => (tile.posX > i.posX + i.width - 1) 
            && (i.posY >= tile.posY && i.posY <= tile.posY + tile.height - 1  
            || tile.posY >= i.posY && tile.posY <= i.posY + i.height - 1 //
            || tile.posY + tile.height - 1 >= i.posY && tile.posY + tile.height <= i.posY + i.height));
        if (tiles.length == 0) {
            tile.posX = 0;
        }
        else if (tiles.length == 1) {
            tile.posX = tiles[0].posX + tiles[0].width;
        }
        else {
            let heighestTile = tiles.reduce((max, t) => max.posX > t.posX ? max : t);
            tile.posX = heighestTile.posX + heighestTile.width;
        }
        this.view.updateTilePosition(tile);
    }
    moveTileRight(dataId) {
        let index = this.currentWall.tiles.findIndex(i => i.id == dataId);
        let tile = this.currentWall.tiles[index];
  
        let tiles = this.currentWall.tiles.filter(i => (tile.posX + tile.width - 1 < i.posX) 
            && (i.posY >= tile.posY && i.posY <= tile.posY + tile.height - 1
            || tile.posY >= i.posY && tile.posY <= i.posY + i.height - 1 //
            || tile.posY + tile.height - 1 >= i.posY && tile.posY + tile.height <= i.posY + i.height));
        if (tiles.length == 0) {
            tile.posX = this.currentWall.width - tile.width;
        }
        else if (tiles.length == 1) {
            tile.posX = tiles[0].posX - tile.width;
        }
        else {
            let heighestTile = tiles.reduce((min, t) => min.posX < t.posX ? min : t);
            tile.posX = heighestTile.posX - tile.width;
        }
        this.view.updateTilePosition(tile);
    }
    moveTileUp(dataId) {
        let index = this.currentWall.tiles.findIndex(i => i.id == dataId);
        let tile = this.currentWall.tiles[index];

        let posX2 = tile.posX + tile.width;   
        let tiles = this.currentWall.tiles.filter(i => (tile.posY > i.posY + tile.height - 1) 
            && (i.posX >= tile.posX && i.posX <= posX2 - 1
            || tile.posX >= i.posX && tile.posX <= i.posX + i.width - 1
            || posX2 - 1 >= i.posX && posX2 <= i.posX + i.width));
        if (tiles.length == 0) {
            tile.posY = 0;
        }
        else if (tiles.length == 1) {
            tile.posY = tiles[0].posY + tiles[0].height;
        }
        else {
            let lowestTile = tiles.reduce((max, t) => max.posY > t.posY ? max : t);
            tile.posY = lowestTile.posY + lowestTile.height;
        }
        this.view.updateTilePosition(tile);
    }
    moveTileDown(dataId) {
        let index = this.currentWall.tiles.findIndex(i => i.id == dataId);
        let tile = this.currentWall.tiles[index];

        let posX2 = tile.posX + tile.width;   
        let tiles = this.currentWall.tiles.filter(i => (tile.posY + tile.height - 1 < i.posY) 
            && (i.posX >= tile.posX && i.posX <= posX2 - 1 
            || tile.posX >= i.posX && tile.posX <= i.posX + i.width - 1
            || posX2 - 1 >= i.posX && posX2 <= i.posX + i.width));
        if (tiles.length == 0) {
            tile.posY = this.currentWall.height - tile.height;
        }
        else if (tiles.length == 1) {
            tile.posY = tiles[0].posY - tile.height;
        }
        else {
            let heighestTile = tiles.reduce((min, t) => min.posY < t.posY ? min : t);
            tile.posY = heighestTile.posY - tile.height;
        }
        this.view.updateTilePosition(tile);
    }  
    createSample(dataId) {
        let tile = this.currentWall.tiles.find(i => i.id == dataId);
        let exists = this.samples.findIndex(i => i.width == tile.width && i.height == tile.height && i.imageId == tile.imageId) !== -1;
        if (!exists) {
            let sample = new SampleModel(`s${this.uuidv4()}`, tile.width, tile.height, this.id);
            sample.imageId = tile.imageId;
            this.samples.push(sample); 
            if (tile.imageId) {                                
                let imgBase64 = this.images.find(i => i.id == tile.imageId).base64;
                this.view.showNewSample(sample, imgBase64);
            }
            else {
                this.view.showNewSample(sample);
            }
        }        
    }
    removeStock(dataId) {
        if (dataId[0] === 's') {
            this.samples.splice(this.samples.findIndex(i => i.id == dataId), 1);
        }
        else if (dataId[0] === 'i') {
            this.images.splice(this.images.findIndex(i => i.id == dataId), 1);
        }        
        this.view.removeHighlightedElement(dataId);
    }
    createDownloadModal() {
        this.modalView.createDownloadModal();
    }
    processFile(file) {
        let context = this;
        let imageModel = new ImageModel(`i${this.uuidv4()}`, this.id);
        imageModel.blob = file;
        imageModel.name = file.name.split('.').slice(0, -1).join('.');

        let reader = new FileReader();
        reader.readAsDataURL(file);        
        reader.onload = (event) => {            
            let image = new Image();
            image.src = event.target.result;  // base64 
            image.onload = (e) => {
                imageModel.height = e.target.naturalHeight;
                imageModel.width = e.target.naturalWidth;          
                imageModel.base64 = e.target.src;
                context.images.push(imageModel);
                context.view.showNewImage(imageModel.id, imageModel.width, imageModel.height, imageModel.name, imageModel.base64);
            }
        }        
    }
    paintTile(tileId, imageId) {
        let tile = this.currentWall.tiles.find(i => i.id == tileId);
        let image = this.images.find(i => i.id == imageId);
        tile.imageId = imageId;
        this.view.updateElementColor(tile.id, image.base64);
    }

    uuidv4() { 
        return ([1e7]+-1e3+-4e3+-8e3).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    }
}