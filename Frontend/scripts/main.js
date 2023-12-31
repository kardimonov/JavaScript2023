const global = {
    stockSize: 80,
    wallRatio: 0.9,
    tileWidth: 500,
    tileHeight: 250
}

const container = document.querySelector("#project_container");
const layoutView = new LayoutView(container);
const modalView = new ModalView();
const ajaxService = new AjaxService();
const project = new ProjectModel(layoutView, modalView, ajaxService);
const controller = new LayoutController(container, project);

layoutView.init();
modalView.init();
controller.init();