using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TileDesign.Data.Models;
using TileDesign.Data.Repositories;
using TileDesign.Web.ViewModels;

namespace TileDesign.Web.Services
{
    public class TileService : ITileService
    {
        private readonly ITileRepository _repo;

        public TileService(ITileRepository repository)
        {
            _repo = repository;
        }

        public async Task<Project> GetProjectById(string id)
        {            
            var res = await _repo.GetProjectById(id);
            return res;
        }

        public async Task<List<ProjectNameOutput>> GetAllProjects()
        {
            var projects = await _repo.GetAllProjects();
            var list = projects.Select(i => new ProjectNameOutput
            {
                Id = i.Id,
                Name = i.Name
            }).ToList();
            return list;
        }

        public async Task AddProject(ProjectVM model)
        {
            var project = new Project
            {
                Id = model.Id,
                Name = model.Name
            };
            _repo.AddProject(project);
            var walls = model.Walls.Select(wall => new Wall
            {
                Id = wall.Id,
                Name = wall.Name,
                Width = wall.Width,
                Height = wall.Height,
                ProjectId = wall.ProjectId
            }).ToList();
            _repo.AddWallRange(walls);

            if (model.Images.Any())
            {
                var images = model.Images.Select(i => new ImageDb
                {
                    Id = i,
                    ProjectId = model.Id
                }).ToList();
                _repo.AddImageRange(images);
            }

            if (model.Samples.Any())
            {
                project.Samples = model.Samples.Select(sample => new Sample
                {
                    Id = sample.Id,
                    Width = sample.Width,
                    Height = sample.Height,
                    ImageId = string.IsNullOrWhiteSpace(sample.ImageId) ? null : sample.ImageId,
                    ProjectId = sample.Id
                }).ToList();
                
                _repo.AddSampleRange(project.Samples);
            }

            if (model.Tiles.Any())
            {
                var tiles = model.Tiles.Select(tile => new Tile
                {
                    Id = tile.Id,
                    Width = tile.Width,
                    Height = tile.Height,
                    PosX = tile.PosX,
                    PosY = tile.PosY,
                    ImageId = string.IsNullOrWhiteSpace(tile.ImageId) ? null : tile.ImageId,
                    WallId = tile.WallId
                }).ToList();
                _repo.AddTileRange(tiles);
            }
        }

        public async Task<ImageDb> GetImageById(string id)
        {
            var res = await _repo.GetImageById(id);
            return res;
        }

        public async Task UpdateImage(ImageVM input)
        {
            byte[] fileData = null;
            using (var memoryStream = new MemoryStream())
            {
                input.Blob.CopyTo(memoryStream);
                fileData = memoryStream.ToArray();
            };

            var image = new ImageDb
            {
                Id = input.Id,
                Width = input.Width,
                Height = input.Height,
                Name = input.Name,
                ProjectId = input.ProjectId,
                Bytes = fileData,
                ContentType = input.Blob.ContentType
            };            
            _repo.UpdateImage(image);
        }
    }
}
