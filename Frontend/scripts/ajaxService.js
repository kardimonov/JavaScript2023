class AjaxService {
    apiUrl = "https://localhost:44343/api"; //"https://127.0.0.1:44343/api";
    constructor() {    }

    async saveProject(project) {
        try {
            let output = {
                id: project.id, 
                name: project.name,
                walls: [],
                images: [],
                samples: [],
                tiles: []               
            };
            for (const wall of project.walls) {
                output.walls.push({
                    id: wall.id,
                    name: wall.name,
                    width: wall.width,
                    height: wall.height,
                    projectId: wall.projectId
                });
                for (const tile of wall.tiles) {
                    output.tiles.push({
                        id: tile.id,
                        width: tile.width,
                        height: tile.height,
                        posX: tile.posX,
                        posY: tile.posY,
                        imageId: tile.imageId,
                        wallId: tile.wallId                        
                    });
                }
            }
            if (project.images.length > 0) {
                output.images = project.images.map(i => i.id);
            }
            if (project.samples.length > 0) {
                output.samples = project.samples.map(i => ({
                    id: i.id,                    
                    width: i.width,
                    height: i.height,
                    imageId: i.imageId,
                    projectId: i.projectId
                }));
            }
            
            const response = await fetch(`${this.apiUrl}/Tile/AddProject`, {
                method: 'POST',
                headers: { "Content-Type": "application/json;charset=UTF-8" },
                body: JSON.stringify(output)
            });
        } 
        catch (error)   {
            console.error("Error", error);
        }     
    }

    async saveImage(imageModel) {
        var formData = new FormData();        
        formData.append("width", imageModel.width);
        formData.append("height", imageModel.height);
        formData.append("name", imageModel.name);        
        formData.append("projectid", imageModel.projectId);
        formData.append("blob", imageModel.blob);
        formData.append("id", imageModel.id);
        const response = await fetch(`${this.apiUrl}/Tile/AddImage`, {
            'method': 'POST',
            'body': formData
        });
    }
    async getAllProjects() {
        try{
            const response = await fetch(`${this.apiUrl}/Tile/GetAllProjects`, {
                'method': 'GET'
            });
            if (response.status == 200) {
                return await response.json();
            }    
        }
        catch(error) {
            console.error("Error:", error);
        }        
    }
    async getProjectById(id) {
        try{
            const response = await fetch(`${this.apiUrl}/Tile/GetProjectById?id=${id}`, {
                'method': 'GET'
            });
            if (response.status == 200) {
                return await response.json();
            }    
        }
        catch(error) {
            console.error("Error:", error);
        }        
    }
    async getImageById(id) {
        try{
            const response = await fetch(`${this.apiUrl}/Tile/GetImageById?id=${id}`, {
                'method': 'GET'
            });
            if (response.status == 200) {
                return await response.blob();
            } 
            return null;    
        }
        catch(error) {
            console.error("Error:", error);
        }  
    }
}