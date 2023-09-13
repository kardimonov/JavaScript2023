using System.Collections.Generic;
using System.Threading.Tasks;
using TileDesign.Data.Models;
using TileDesign.Web.ViewModels;

namespace TileDesign.Web.Services
{
    public interface ITileService
    {
        Task<Project> GetProjectById(string id);
        Task<List<ProjectNameOutput>> GetAllProjects();
        Task AddProject(ProjectVM model);
        Task<ImageDb> GetImageById(string id);
        Task UpdateImage(ImageVM model);
    }
}
