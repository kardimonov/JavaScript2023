class ModalView {
    modal = null;

    init() {
        this.modal = document.querySelector("#modal");
    }
    showModalFrame(title) {
        this.modal.classList.add("modal");               

        let modalHeader = document.createElement("div");
        modalHeader.className = "modal-header";
        let modalTitle = document.createElement("h4");
        modalTitle.className = "modal-title";
        modalTitle.textContent = title;

        let btnClose = document.createElement("a");
        btnClose.className = "btn_close-modal";
        btnClose.id = "btn_close-modal";
        btnClose.href = "#";
        btnClose.innerHTML = "<span>&times;</span>";
        modalHeader.append(modalTitle, btnClose);
        this.modal.append(modalHeader);
    }
    createInputRow(labelTxt, rowName, inputValue) {
        let row = document.createElement("div");        
        let label = document.createElement("label");
        label.textContent = labelTxt;
        label.setAttribute("for", rowName);
        let input = document.createElement("input");
        input.type = "number";
        input.name = rowName;
        input.id = rowName;
        input.setAttribute("min", "0");
        if (inputValue || inputValue === 0) {
            input.value = `${inputValue}`;
        }
        let measure = document.createElement("p");
        measure.textContent = "мм"; 
        row.append(label, input, measure);        
        return row;  
    }
    createTxtInputRow(labelTxt, rowName) {
        let row = document.createElement("div");        
        let label = document.createElement("label");
        label.textContent = labelTxt;
        label.setAttribute("for", rowName);
        let input = document.createElement("input");
        input.type = "text";
        input.name = rowName;
        input.id = rowName;        
        row.append(label, input);        
        return row;  
    }
    closeModal() {
        this.modal.innerHTML = "";
        this.modal.classList.remove("modal");
    }
    createModalFooter() {
        let modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";
        let btnOk = document.createElement("button");
        btnOk.type = "submit";
        btnOk.textContent = "ОК";
        btnOk.className = "btn_ok-modal";
        btnOk.id = "btn_ok-modal";
        let btnCancel = document.createElement("a");
        btnCancel.href = "#";
        btnCancel.textContent = "Отмена";
        btnCancel.className = "btn_cancel-modal";
        btnCancel.id = "btn_cancel-modal";
        modalFooter.append(btnOk, btnCancel);
        return modalFooter;
    }
    changeTileEditTab(selectedTab) {
        let oldTab = this.modal.querySelector(".tile_active-tab");
        oldTab.classList.remove("tile_active-tab");        
        let oldBlock = this.modal.querySelector(".tile_active-block");
        oldBlock.classList.remove("tile_active-block");
        let newTab = this.modal.querySelector(`#${selectedTab}`);
        newTab.classList.add("tile_active-tab");
        let newBlock = this.modal.querySelector(`[data-tab="${selectedTab}"]`);
        newBlock.classList.add("tile_active-block");
    }
    showWelcomeModal() {
        this.showModalFrame("Добро пожаловать в 'Дизайн плитки'");
        let modalInner = document.createElement("div");
        modalInner.className = "modal-inner modal-welcome";        
        this.modal.append(modalInner);

        let links = [
            ["Новый проект", "btn_modal_create-project", "img/create-new_icon.png"],
            ["Открыть проект", "btn_modal_open-project", "img/open_icon.png"]            
        ];
        for (let i = 0; i < links.length; i++) {
            let link = document.createElement("a");
            link.id = links[i][1];
            link.href = "#";
            let linkTxt = document.createElement("p");
            linkTxt.className = "modal-welcome_txt";
            linkTxt.textContent = links[i][0];
            let linkImg = document.createElement("img");
            linkImg.src = links[i][2];
            linkImg.alt = links[i][0];
            linkImg.className = "modal-welcome_img";
            link.append(linkTxt, linkImg);
            modalInner.append(link);
        }  
    }
    showRoomSizeModal() {
        this.showModalFrame("Размеры помещения");
        let modalInner = document.createElement("div");
        modalInner.className = "modal-inner modal-room-size";        
        let txtInputRow = this.createTxtInputRow("Название проекта", "project-name");
        txtInputRow.className = "modal_txt-input-row";

        let rowList = document.createElement("div");
        rowList.append(txtInputRow);
        
        let inputs = [
            ["Глубина", "room-length"],
            ["Ширина", "room-width"],
            ["Высота", "room-height"]         
        ];
        for (let i = 0; i < inputs.length; i++) {
            let row = this.createInputRow(inputs[i][0], inputs[i][1]);
            row.className = "modal-room-size_row";
            rowList.append(row);            
        }  
        modalInner.append(rowList);
        let modalFooter = this.createModalFooter();        
        this.modal.append(modalInner, modalFooter);
    }
    showTileEditModal(tileLeft, tileDown, tileWidth, tileHeight, dataId) {
        this.showModalFrame("Свойства плитки");
        let modalInner = document.createElement("div");
        modalInner.className = "modal-inner modal-tile-edit"; 
        modalInner.id = "modal-inner"; 
        modalInner.setAttribute("modal-id", dataId);
        
        let tileEditTabs = document.createElement("ul");
        tileEditTabs.className = "tab_list-left";
        tileEditTabs.id = "tile-edit_tab_list";
        let tileEditBlocks = document.createElement("div");
        tileEditBlocks.className = "tile-edit_blocks";
        let tileTabs = [
            ["Позиция", "tile-position", false, tileLeft, tileDown],
            ["Размеры", "tile-size", true, tileWidth, tileHeight]
        ];
        for (let i = 0; i < tileTabs.length; i++) {
            let tileTab = document.createElement("li");
            tileTab.id = tileTabs[i][1];
            tileTab.textContent = tileTabs[i][0];
            tileTab.className = "tile-edit_tab";            

            let tileContent = document.createElement("div");
            tileContent.setAttribute("data-tab", tileTabs[i][1]);
            tileContent.className = "tile-edit_content";
            if (tileTabs[i][2]) {
                tileTab.classList.add("tile_active-tab");
                tileContent.classList.add("tile_active-block");
            }
            let row1 = null;
            let row2 = null;
            if (i === 0) {
                row1 = this.createInputRow("Влево", "tile-left", tileTabs[i][3]);                
                row2 = this.createInputRow("Вниз", "tile-down", tileTabs[i][4]);  
            }            
            else {
                row1 = this.createInputRow("Ширина", "tile-width", tileTabs[i][3]);
                row2 = this.createInputRow("Высота", "tile-height", tileTabs[i][4]);              
            }
            row1.className = "modal-room-size_row";
            row2.className = "modal-room-size_row";
            tileContent.append(row1, row2);
            
            tileEditTabs.append(tileTab); 
            tileEditBlocks.append(tileContent);                         
        }
        modalInner.append(tileEditTabs, tileEditBlocks);
        let modalFooter = this.createModalFooter();
        this.modal.append(modalInner, modalFooter);
    }   
    createDownloadModal() {
        this.showModalFrame("Загрузка рисунка или текстуры");
        let modalInner = document.createElement("div");
        modalInner.className = "modal-inner modal-room-size"; 

        let row = document.createElement("div");
        row.className = "modal-file_row";
        let labelFile = document.createElement("label");
        labelFile.className = "login_label";
        labelFile.textContent = "Выберите файл";
        labelFile.for = "file";        
        let inputFile = document.createElement("input");
        inputFile.className = "input_file";
        inputFile.type = "file";
        inputFile.id = "file";
        inputFile.name = "file";
        inputFile.accept = ".png,.jpg,.jpeg,.gif,.tiff,.bmp";
              
        row.append(labelFile, inputFile);
        modalInner.append(row);
        let modalFooter = this.createModalFooter();        
        this.modal.append(modalInner, modalFooter);
    }
    showSelectProjectModal() {
        this.showModalFrame("Выбор проекта");
        let modalInner = document.createElement("div");
        modalInner.className = "modal-inner modal_select-project"; 
        let linkList = document.createElement("ul");
        linkList.className = "select-project_links";
        linkList.id = "select-project";        
        modalInner.append(linkList);
        this.modal.append(modalInner);
    }
    fillSelectProjectModalWithData(projects) {
        let linkList = this.modal.querySelector("#select-project");
        for (let i = 0; i < projects.length; i++) {
            let linkRow = document.createElement("li");
            let link = document.createElement("a");
            link.href = "#";
            link.id = `${projects[i].id}`;
            link.textContent = `${projects[i].name}`;
            linkRow.append(link);
            linkList.append(linkRow);
        }
    }
}