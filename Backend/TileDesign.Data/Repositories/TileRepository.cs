using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TileDesign.Data.Context;
using TileDesign.Data.Models;

namespace TileDesign.Data.Repositories
{
    public class TileRepository : ITileRepository
    {
        private readonly ApplicationContext _db;

        public TileRepository(ApplicationContext context)
        {
            _db = context;
        }

        public async Task<Project> GetProjectById(string id)
        {
            var result = await _db.Projects
                .Select(p => new Project
                {
                    Id = p.Id,
                    Name = p.Name,
                    Walls = p.Walls.Select(w => new Wall
                    {
                        Id = w.Id,
                        Name = w.Name,
                        Width = w.Width,
                        Height = w.Height,
                        ProjectId = w.ProjectId,
                        Tiles = w.Tiles.Select(t => new Tile
                        {
                            Id = t.Id,
                            Width = t.Width,
                            Height = t.Height,
                            PosX = t.PosX,
                            PosY = t.PosY,
                            ImageId = t.ImageId,
                            WallId = t.WallId
                        }).ToList()
                    }).ToList(),
                    Samples = p.Samples.Select(s => new Sample
                    {
                        Id = s.Id,
                        Width = s.Width,
                        Height = s.Height,
                        ImageId = s.ImageId,
                        ProjectId = s.ProjectId
                    }).ToList(),
                    Images = p.Images.Select(i => new ImageDb
                    {
                        Id = i.Id,
                        Width = i.Width,
                        Height = i.Height,
                        Name = i.Name,
                        ProjectId = i.ProjectId
                    }).ToList()
                })
                .FirstOrDefaultAsync(p => p.Id == id);
            return result;
        }

        public async Task<List<Project>> GetAllProjects()
        {
            return await _db.Projects
                .AsNoTracking()
                .ToListAsync();
        }
        
        public async Task<ImageDb> GetImageById(string id)
        {
            return await _db.Images
                .AsNoTracking()                
                .FirstOrDefaultAsync(i => i.Id == id);
        }
                       
        public void AddProject(Project project)
        {
            _db.Projects.Add(project);
            _db.SaveChanges();
        }

        public void AddWallRange(List<Wall> walls)
        {
            _db.Walls.AddRange(walls);
            _db.SaveChanges();
        }

        public void AddImageRange(List<ImageDb> input)
        {
            _db.Images.AddRange(input);
            _db.SaveChanges();
        }

        public void AddSampleRange(List<Sample> input)
        {
            _db.Samples.AddRange(input);
            _db.SaveChanges();
        }

        public void AddTileRange(List<Tile> input)
        {
            _db.Tiles.AddRange(input);
            _db.SaveChanges();
        }

        public void UpdateImage(ImageDb input)
        {
            var image = _db.Images.FirstOrDefault(i => i.Id == input.Id);
            if (image != null)
            {               
                image.Name = input.Name;
                image.Width = input.Width;
                image.Height = input.Height;
                image.Bytes = input.Bytes;
                image.ContentType = input.ContentType;
                _db.Images.Update(image);
                _db.SaveChanges();
            }
        }
    }
}
