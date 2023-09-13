class WallModel {
    tiles = [];
    constructor(id, width, height, name, projectId) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.name = name;
        this.projectId = projectId;
    }
};

class TileModel {       
    posX = 0;
    posY = 0;
    imageId = "";
    constructor(id, width, height, wallId) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.wallId = wallId;
    }
};

class SampleModel {   
    imageId = ""; 
    constructor(id, width, height, projectId) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.projectId = projectId;        
    }
};

class ImageModel {       
    name = "";
    width = 0;
    height = 0;
    base64 = "";
    blob = []; 
    constructor(id, projectId) {        
        this.id = id;
        this.projectId = projectId;
    }
};