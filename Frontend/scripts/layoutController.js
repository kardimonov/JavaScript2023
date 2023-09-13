class LayoutController {
    modal = null;
    btnClose = null;    

    constructor(container, project) {        
        this.container = container;
        this.project = project;
        self = this;
    }

    init() {
        const btnOpenProject = this.container.querySelector("#open-project");
        btnOpenProject.addEventListener("click", this.openProject);
        const btnNewProject = this.container.querySelector("#create-project");
        btnNewProject.addEventListener("click", this.createProject);
        const btnSaveProject = this.container.querySelector("#save-project");
        btnSaveProject.addEventListener("click", this.saveProject);
        const btnMoveLeft = this.container.querySelector("#move-left");
        btnMoveLeft.addEventListener("click", this.moveTileLeft);
        const btnMoveRight = this.container.querySelector("#move-right");
        btnMoveRight.addEventListener("click", this.moveTileRight);
        const btnMoveUp = this.container.querySelector("#move-up");
        btnMoveUp.addEventListener("click", this.moveTileUp);
        const btnMoveDown = this.container.querySelector("#move-down");
        btnMoveDown.addEventListener("click", this.moveTileDown);
        const btnCreateTile = this.container.querySelector("#create-tile");
        btnCreateTile.addEventListener("click", this.createTile);
        const btnEditTile = this.container.querySelector("#edit-tile");
        btnEditTile.addEventListener("click", () => {
            let tileInner = this.container.querySelector(".highlight");
            if (tileInner) {
                this.editTile(tileInner.parentElement.id); 
            }            
        });        
        const btnCreateSample = this.container.querySelector("#create-sample");
        btnCreateSample.addEventListener("click", this.createSample);
        const btnCreateImg = this.container.querySelector("#create-img");
        btnCreateImg.addEventListener("click", this.createImage);
        const btnPaintTile = this.container.querySelector("#paint-tile");
        btnPaintTile.addEventListener("click", this.paintTile);
        const btnRemoveTile = this.container.querySelector("#remove-tile");
        btnRemoveTile.addEventListener("click", this.removeTile);        

        const wallTabs = this.container.querySelector("#wall_tab_list");
        wallTabs.addEventListener("click", this.changeWall);
        const stockTabs = this.container.querySelector("#stock_tab_list");
        stockTabs.addEventListener("click", this.changeStock);
        const stockBlocks = this.container.querySelector("#stock_blocks");
        stockBlocks.addEventListener("click", this.selectStock);

        this.project.createWelcomeModal();
        this.modal = this.container.querySelector("#modal");
        this.btnClose = this.container.querySelector("#btn_close-modal");
        this.btnClose.addEventListener("click", this.closeModal);
        const newProject = this.container.querySelector("#btn_modal_create-project");
        newProject.addEventListener("click", this.createProject);        
        const openProject = this.container.querySelector("#btn_modal_open-project");
        openProject.addEventListener("click", this.openProject);
    }
    openProject() {
        if (modal) {
            self.closeModal();
        }        
        self.project.showSelectProjectModal();        
        self.modal = self.container.querySelector("#modal");
        let btnClose = self.container.querySelector("#btn_close-modal");
        btnClose.addEventListener("click", self.closeModal);
        let links = self.container.querySelector("#select-project"); 
        links.addEventListener("click", async (e) => {
            let highlightedWallTab = self.container.querySelector(".wall_active-tab");
            if (highlightedWallTab) {
                self.project.unhighlightBlock("wall_active-tab");
            }
            self.closeModal();
            await self.project.downloadProject(e.target.id);
            self.addListenerToWall();
        });
        self.project.openProject();
    }    
    createProject() {
        let highlightedWallTab = self.container.querySelector(".wall_active-tab");
        if (highlightedWallTab) {
            self.project.unhighlightBlock("wall_active-tab");
        }
        self.project.createProject();
        self.modal = self.container.querySelector("#modal");
        let btnClose = self.container.querySelector("#btn_close-modal");
        btnClose.addEventListener("click", self.closeModal);
        let btnOk = self.modal.querySelector("#btn_ok-modal");
        btnOk.addEventListener("click", self.setRoomDimensions);
        let btnCancel = self.modal.querySelector("#btn_cancel-modal");
        btnCancel.addEventListener("click", self.closeModal);        
    }
    saveProject() {
        self.project.saveProject();
    }
    setRoomDimensions() {
        let length = self.modal.querySelector("#room-length").value;
        let width = self.modal.querySelector("#room-width").value;
        let height = self.modal.querySelector("#room-height").value;
        let name = self.modal.querySelector("#project-name").value;
        self.project.setRoomDimensions(Number(length), Number(width), Number(height), name);
        self.addListenerToWall();
        self.closeModal();
    }    
    changeWall(e) {
        if (!e.target.classList.contains("wall_active-tab")) {
            self.project.changeWall(e.target.id, "wall_active-tab");
            self.addListenerToWall();
        }
    }
    addListenerToWall() {
        let wall = self.container.querySelector("#wall");
        wall.addEventListener("click", (e) => {
            let highlightedElem = self.container.querySelector(".highlight");              
            if (!highlightedElem && e.target.classList.contains("tile_inner") && e.detail === 1) {
                self.project.highlightBlock(e.target.parentElement.id, "highlight"); 
            }
            else if (highlightedElem && !self.modal && e.detail === 1) {
                if (e.target.classList.contains("tile_inner") && e.target.parentElement.id != highlightedElem.parentElement.id) {
                    self.project.unhighlightBlock("highlight"); 
                    self.project.highlightBlock(e.target.parentElement.id, "highlight"); 
                }
                else {
                    self.project.unhighlightBlock("highlight");
                }                 
            }
        });
    }
    changeStock(e) {
        if (!e.target.classList.contains("stock_active-tab")) {
            let element = self.container.querySelector(".selected");
            if (element && !self.modal) {
                self.project.unhighlightBlock("selected"); 
            }
            self.project.changeStock(e.target.id);
        }
    }
    createTile() {  
        let selectedElem = self.container.querySelector(".selected");        
        selectedElem && selectedElem.parentElement.id === "sample_list"
            ? self.project.createTileFromSample(selectedElem.id) 
            : self.project.createTile();            
        let highlightedElem = self.container.querySelector(".highlight");
        if (highlightedElem)
        {
            self.project.unhighlightBlock("highlight");
        }
        let newTile = self.container.querySelector(".new"); 
        newTile.addEventListener("dblclick", (e) => {  
            if (!self.modal) {
                let dataId = e.currentTarget.id; 
                if (!e.target.classList.contains("highlight")) {
                    self.project.highlightBlock(dataId, "highlight");
                }
                self.editTile(dataId);
            }
        });
        self.project.highlightBlock(newTile.id, "highlight");
        self.project.unhighlightBlock("new");
    }
    editTile(dataId) {        
        self.project.createTileEditModal(dataId);

        self.modal = self.container.querySelector("#modal");
        let btnClose = self.container.querySelector("#btn_close-modal");
        btnClose.addEventListener("click", self.closeModal);
        let btnCancel = self.modal.querySelector("#btn_cancel-modal");
        btnCancel.addEventListener("click", self.closeModal);
        let tileEditTabs = self.container.querySelector("#tile-edit_tab_list");
        tileEditTabs.addEventListener("click", (e) => {
            if (!e.target.classList.contains("tile_active-tab")) {
                self.project.changeTileEditTab(e.target.id);                    
            }
        });
        let btnOk = self.modal.querySelector("#btn_ok-modal");            
        btnOk.addEventListener("click", () => { 
            let width = self.modal.querySelector("#tile-width").value;
            let height = self.modal.querySelector("#tile-height").value;
            let left = self.modal.querySelector("#tile-left").value;
            let down = self.modal.querySelector("#tile-down").value;
            self.project.editTile(dataId, Number(width), Number(height), Number(left), Number(down));
            self.closeModal();
        });                 
    }
    removeTile() {
        let tileInner = self.container.querySelector(".highlight");        
        if (tileInner) {
            self.project.removeTile(tileInner.parentElement.id); 
        }    
        else {
            let stock = self.container.querySelector(".selected");
            if (stock) {
                self.project.removeStock(stock.id); 
            }
        }  
    }
    moveTileLeft() {
        let tileInner = self.container.querySelector(".highlight");
        if (tileInner) {
            self.project.moveTileLeft(tileInner.parentElement.id); 
        }        
    }
    moveTileRight() {
        let tileInner = self.container.querySelector(".highlight");
        if (tileInner) {
            self.project.moveTileRight(tileInner.parentElement.id); 
        }        
    }
    moveTileUp() {
        let tileInner = self.container.querySelector(".highlight");
        if (tileInner) {
            self.project.moveTileUp(tileInner.parentElement.id); 
        }        
    }
    moveTileDown() {        
        let tileInner = self.container.querySelector(".highlight");
        if (tileInner) {
            self.project.moveTileDown(tileInner.parentElement.id); 
        }        
    } 
    createSample() {
        let tileInner = self.container.querySelector(".highlight");
        if (tileInner && !self.modal) {
            self.project.createSample(tileInner.parentElement.id); 
            
            let sampleTab = self.container.querySelector("#sample_tab");
            if (!sampleTab.classList.contains("stock_active-tab")) {
                let element = self.container.querySelector(".selected");
                if (element) {
                    self.project.unhighlightBlock("selected");
                }
                self.project.changeStock(sampleTab.id);
            }
        }
    }
    selectStock(e) {
        let selectedElem = self.container.querySelector(".selected");              
        if (!selectedElem && e.target.parentElement.classList.contains("stock")) {
            self.project.highlightBlock(e.target.parentElement.id, "selected"); 
        }        
        else if (selectedElem) {
            if (e.target.parentElement.classList.contains("stock") && e.target.parentElement.id != selectedElem.id) {
                self.project.unhighlightBlock("selected"); 
                self.project.highlightBlock(e.target.parentElement.id, "selected"); 
            }
            else {
                self.project.unhighlightBlock("selected");
            }                 
        }
        // else if (selectedElem && !self.modal) {
        //     self.project.unhighlightBlock("selected"); 
        // }
    } 
    createImage() {
        self.project.createDownloadModal();

        self.modal = self.container.querySelector("#modal");
        let btnClose = self.container.querySelector("#btn_close-modal");
        btnClose.addEventListener("click", self.closeModal);
        let btnCancel = self.modal.querySelector("#btn_cancel-modal");
        btnCancel.addEventListener("click", self.closeModal);

        let btnOk = self.modal.querySelector("#btn_ok-modal");            
        btnOk.addEventListener("click", () => { 
            let inputFile = self.modal.querySelector("#file"); 
            if (inputFile.files.length > 0) {
                let file = inputFile.files[0];         
                self.project.processFile(file);
                self.closeModal();
            
                let imgTab = self.container.querySelector("#image_tab");
                if (!imgTab.classList.contains("stock_active-tab")) {
                    let element = self.container.querySelector(".selected");
                    if (element) {
                        self.project.unhighlightBlock("selected"); 
                    }
                    self.project.changeStock(imgTab.id);
                }
            }            
        });
    }
    paintTile() {        
        let tileInner = self.container.querySelector(".highlight");
        if (tileInner) {
            let selectedElem = self.container.querySelector(".selected");
            if (selectedElem && selectedElem.parentElement.id === "image_list") {
                self.project.paintTile(tileInner.parentElement.id, selectedElem.id);
            }
        }
    }
    closeModal() {
        self.modal = null;
        self.project.closeModal();               
    }
}