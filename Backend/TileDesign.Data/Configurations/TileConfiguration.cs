using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TileDesign.Data.Models;

namespace TileDesign.Data.Configurations
{
    public class TileConfiguration : IEntityTypeConfiguration<Tile>
    {
        public void Configure(EntityTypeBuilder<Tile> builder)
        {
            builder.Property(i => i.Id)
                .IsRequired();
            builder.Property(i => i.Width)
                .IsRequired();
            builder.Property(i => i.Height)
                .IsRequired();
            builder.Property(i => i.PosX)
                .IsRequired();
            builder.Property(i => i.PosY)
                .IsRequired();
            builder.Property(i => i.WallId)
                .IsRequired();

            builder.HasOne(s => s.Image)
                .WithMany(i => i.Tiles)
                .HasForeignKey(s => s.ImageId);
            builder.HasOne(s => s.Wall)
                .WithMany(p => p.Tiles)
                .HasForeignKey(s => s.WallId);
        }
    }
}
