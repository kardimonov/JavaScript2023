using System.Collections.Generic;
using System.Threading.Tasks;
using TileDesign.Data.Models;

namespace TileDesign.Data.Repositories
{
    public interface ITileRepository
    {
        Task<Project> GetProjectById(string id);
        Task<List<Project>> GetAllProjects();
        Task<ImageDb> GetImageById(string id);
        void AddProject(Project project);
        void AddWallRange(List<Wall> walls);
        void AddImageRange(List<ImageDb> input);       
        void AddSampleRange(List<Sample> input);
        void AddTileRange(List<Tile> input);
        void UpdateImage(ImageDb input);
    }
}
