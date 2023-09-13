using Microsoft.EntityFrameworkCore;
using TileDesign.Data.Configurations;
using TileDesign.Data.Models;

namespace TileDesign.Data.Context
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        { }

        public DbSet<Project> Projects { get; set; } = null!;
        public DbSet<Wall> Walls { get; set; } = null!;
        public DbSet<Tile> Tiles { get; set; } = null!;
        public DbSet<Sample> Samples { get; set; } = null!;
        public DbSet<ImageDb> Images { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(TileConfiguration).Assembly);
        }
    }
}
