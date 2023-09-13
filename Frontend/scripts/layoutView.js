const headerBtns = [
    ["Открыть проект", "img/open_icon.png", "open-project", false],
    ["Новый проект", "img/create-new_icon.png", "create-project", false],
    ["Сохранить", "img/save_icon.png", "save-project", false],
    ["Влево", "img/arrow-left_icon.png", "move-left", true],
    ["Направо", "img/arrow-right_icon.png", "move-right", false],
    ["Вверх", "img/arrow-up_icon.png", "move-up", false],
    ["Вниз", "img/arrow-down_icon.png", "move-down", false],
    ["Добавить новую плитку", "img/add-tile_icon2.png", "create-tile", true],
    ["Изменить плитку", "img/edit-tile_icon.png", "edit-tile", false],
    ["Скопировать в шаблон", "img/add-sample_icon.png", "create-sample", false],
    ["Загрузить рисунок или текстуру", "img/add-img_icon.png", "create-img", true],
    ["Перенести рисунок на плитку", "img/paint-tile_icon.png", "paint-tile", false],
    ["Удалить выделенную плитку или шаблон", "img/remove-tile_icon.png", "remove-tile", true]
];
const walls = [
    ["Передняя стена", "front-wall"],
    ["Задняя стена", "back-wall"],
    ["Левая стена", "left-wall"],
    ["Правая стена", "right-wall"]
];

class LayoutView {
    modal = null;
    board = null;
    wall = null;
    scale = 1;

    constructor(container) {        
        this.container = container;
    }
    init() {
        const headerBlock = document.createElement("header");        
        const topNavList = document.createElement("ul");
        topNavList.className = "top-nav_list";
        headerBlock.append(topNavList);
        for (let i = 0; i < headerBtns.length; i++) {
            let topNavItem = document.createElement("li");
            if (headerBtns[i][3]) {
                topNavItem.classList.add("border-left");
            }            
            let btnTopNav = document.createElement("a");
            btnTopNav.href = "#";
            btnTopNav.id = headerBtns[i][2];
            btnTopNav.title = headerBtns[i][0];
            let imgTopNav = document.createElement("img");
            imgTopNav.src = headerBtns[i][1];
            imgTopNav.alt = headerBtns[i][0];
            imgTopNav.className = "top-nav_img";
            btnTopNav.append(imgTopNav);
            topNavItem.append(btnTopNav);
            topNavList.append(topNavItem);
        }         
        container.append(headerBlock);

        const mainBlock = document.createElement("main"); 
        mainBlock.className = "main_block";
        const leftMainBlock = this.createLeftMainBlock();
        let rightMainBlock = this.createRightMainBlock(); 
        this.modal = document.createElement("div");   
        this.modal.id = "modal"; 
        mainBlock.append(this.modal, leftMainBlock, rightMainBlock); 
        container.append(mainBlock); 
    }  
    createLeftMainBlock() {
        const leftMainBlock = document.createElement("div");        
        leftMainBlock.id = "left-main-block";
        leftMainBlock.className = "left-main_block";
        
        this.board = document.createElement("div");
        this.board.id = "wall-content";
        this.board.className = "wall_content";
        const wallTabs = document.createElement("ul");
        wallTabs.className = "tab_list-center";
        wallTabs.id = "wall_tab_list";
        for (let i = 0; i < walls.length; i++) {
            let wallTab = document.createElement("li");
            wallTab.id = walls[i][1];
            wallTab.textContent = walls[i][0];
            wallTab.className = "wall_tab";
            wallTabs.append(wallTab);
        }
        leftMainBlock.append(this.board, wallTabs);
        return leftMainBlock;
    }  
    createRightMainBlock() {
        let rightMainBlock = document.createElement("div");
        rightMainBlock.className = "right-main_block";
        
        let stockTabs = document.createElement("ul");
        stockTabs.className = "tab_list-left";
        stockTabs.id = "stock_tab_list";
        let stockBlockList = document.createElement("div");
        stockBlockList.className = "stock_block_list";
        stockBlockList.id = "stock_blocks";
        let stocks = [
            ["Шаблоны", "sample", true],
            ["Рисунки", "image", false]
        ];
        for (let i = 0; i < stocks.length; i++) {
            let stockTab = document.createElement("li");
            stockTab.id = `${stocks[i][1]}_tab`;
            stockTab.textContent = stocks[i][0];
            stockTab.className = "stock_tab";            

            let stockBlock = document.createElement("div");
            stockBlock.setAttribute("data-tab", `${stocks[i][1]}_tab`);
            stockBlock.className = "stock_block";
            if (stocks[i][2]) {
                stockTab.classList.add("stock_active-tab");
                stockBlock.classList.add("stock_active-block");
            }
            let stockContentList = document.createElement("ul"); 
            stockContentList.className = `stock_list`;  
            stockContentList.id = `${stocks[i][1]}_list`; 
            
            stockBlock.append(stockContentList);            
            stockTabs.append(stockTab); 
            stockBlockList.append(stockBlock);                         
        }
        rightMainBlock.append(stockTabs, stockBlockList);        
        return rightMainBlock;
    }    
    changeStockTab(selectedTab) {
        let oldTab = this.container.querySelector(".stock_active-tab");
        oldTab.classList.remove("stock_active-tab");        
        let oldBlock = this.container.querySelector(".stock_active-block");
        oldBlock.classList.remove("stock_active-block");
        let newTab = this.container.querySelector(`#${selectedTab}`);
        newTab.classList.add("stock_active-tab");
        let newBlock = this.container.querySelector(`[data-tab="${selectedTab}"]`);
        newBlock.classList.add("stock_active-block");
    }
    removeWall() {        
        this.board.innerHTML = "";
    }
    showWall(wallObj) {
        this.wall = document.createElement("div");
        let tab = container.querySelector(`#${wallObj.name}`);
        tab.classList.add("wall_active-tab");

        let wallProp = wallObj.width / wallObj.height;
        if (wallProp > this.board.clientWidth / this.board.clientHeight) {
            this.wall.style.width = this.board.clientWidth * global.wallRatio;            
            this.wall.style.height = this.board.clientWidth * global.wallRatio / wallProp; 
        }
        else {
            this.wall.style.height = this.board.clientHeight * global.wallRatio;
            this.wall.style.width = this.board.clientHeight * global.wallRatio * wallProp;            
        }
        this.wall.className = "wall";
        this.wall.id = "wall";        
        this.board.append(this.wall);  
        this.scale = wallObj.width / this.wall.clientWidth;
    }
    showTile(tileObj, isNew, imgBase64) {        
        let tile = document.createElement("div");        
        tile.className = "tile";
        if (isNew) {
            tile.classList.add("new");
        }
        tile.id = tileObj.id; 
        tile.style.width = tileObj.width / this.scale;
        tile.style.height = tileObj.height / this.scale;
        tile.style.left = `${tileObj.posX / this.scale}px`;
        tile.style.top = `${tileObj.posY / this.scale}px`;
        if (imgBase64) {
            tile.style.backgroundImage = `url("${imgBase64}")`; 
        }
        let tileInner = document.createElement("div");
        tileInner.className = "tile_inner";
        tile.append(tileInner);
        this.wall.append(tile);
    }
    updateTile(tileObj) {
        let tile = this.container.querySelector(`#${tileObj.id}`); 
        tile.style.width = tileObj.width / this.scale;
        tile.style.height = tileObj.height / this.scale;
        tile.style.left = `${tileObj.posX / this.scale}px`;
        tile.style.top = `${tileObj.posY / this.scale}px`;
    }    
    addToClassList(dataId, className) {
        let element = className === "highlight" 
            ? this.container.querySelector(`#${dataId} > div`) 
            : container.querySelector(`#${dataId}`); 
        element.classList.add(className);
    }
    removeFromClassList(className) {
        let element = container.querySelector(`.${className}`);
        element.classList.remove(className);
    }
    updateTilePosition(tileObj) {
        let tile = container.querySelector(`#${tileObj.id}`); 
        tile.style.left = `${tileObj.posX / this.scale}px`;
        tile.style.top = `${tileObj.posY / this.scale}px`;
    }
    removeHighlightedElement(dataId) {
        let block = container.querySelector(`#${dataId}`);
        block.remove();
    }
    showNewSample(sampleObj, imgBase64) {
        const sampleList = container.querySelector("#sample_list");
        const sample = document.createElement("li");
        sample.className = "stock";
        sample.id = sampleObj.id;

        let sampleProp = sampleObj.width / sampleObj.height;
        const sampleBlock = document.createElement("div");
        sampleBlock.className = "sample_block";   
        if (imgBase64) {
            sampleBlock.style.backgroundImage = `url("${imgBase64}")`; 
        }   
        sampleBlock.style.width = sampleProp < 1 ? `calc(${global.stockSize}px * ${sampleProp})` : `${global.stockSize}px`;           
        sampleBlock.style.height = sampleProp > 1 ? `calc(${global.stockSize}px * ${1 / sampleProp})` : `${global.stockSize}px`;
        
        const sampleTxt = document.createElement("p");
        sampleTxt.className = "stock_txt";
        sampleTxt.textContent = `${sampleObj.width}x${sampleObj.height}`;
        sample.append(sampleBlock, sampleTxt);
        sampleList.append(sample);
    }
    showNewImage(id, width, height, shortName, srcData) {
        const imageList = container.querySelector("#image_list");
        const image = document.createElement("li");
        image.className = "stock";
        image.id = id;

        let imageProp = width / height;
        const imageBlock = document.createElement("div");
        imageBlock.className = "image_block";
        imageBlock.style.backgroundImage = `url("${srcData}")`;
        imageBlock.style.width = imageProp < 1 ? `calc(${global.stockSize}px * ${imageProp})` : `${global.stockSize}px`;           
        imageBlock.style.height = imageProp > 1 ? `calc(${global.stockSize}px * ${1 / imageProp})` : `${global.stockSize}px`;

        const imageTxt = document.createElement("p");
        imageTxt.className = "stock_txt";
        imageTxt.textContent = shortName;
        image.append(imageBlock, imageTxt);
        imageList.append(image);
    }
    updateElementColor(elemId, imgBase64) {
        const elem = elemId[0] === 's' 
            ? this.container.querySelector(`#${elemId} > div`)
            : this.container.querySelector(`#${elemId}`);
        elem.style.backgroundImage = `url("${imgBase64}")`;        
    }
    removeAllStocks() {
        const imageList = this.container.querySelector("#image_list");
        imageList.innerHTML = "";
        const sampleList = this.container.querySelector("#sample_list");
        sampleList.innerHTML = "";
    }
}