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
            return await _db.Projects
                .AsNoTracking()
                .Include(p => p.Walls)
                .ThenInclude(w => w.Tiles)
                .Include(p => p.Images)
                .Include(p => p.Samples)
                .FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<List<Project>> GetAllProjects()
        {
            return await _db.Projects
                .AsNoTracking()
                .ToListAsync();
        }
        
        public async Task<ImageDb> GetImage(string id)
        {
            return await _db.Images
                .AsNoTracking()                
                .FirstOrDefaultAsync(i => i.Id == id);
        }

        //public async Task DeleteImage(string id)
        //{
        //    _db.Images.Remove(await _db.Images.FindAsync(id));
        //    await _db.SaveChangesAsync();
        //}
        
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

        public async Task UpdateImage(ImageDb input)
        {
            var image = _db.Images.FirstOrDefault(i => i.Id == input.Id);
            if (image != null)
            {               
                image.Name = input.Name;
                image.Width = input.Width;
                image.Height = input.Height;
                image.Bytes = input.Bytes; 
                await _db.SaveChangesAsync();
            }
        }
    }
}
