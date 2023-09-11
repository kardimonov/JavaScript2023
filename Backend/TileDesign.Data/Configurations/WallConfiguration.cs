using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TileDesign.Data.Models;

namespace TileDesign.Data.Configurations
{
    public class WallConfiguration : IEntityTypeConfiguration<Wall>
    {
        public void Configure(EntityTypeBuilder<Wall> builder)
        {
            builder.Property(i => i.Id)
                 .IsRequired();
            builder.Property(i => i.Width)
                .IsRequired();
            builder.Property(i => i.Height)
                .IsRequired();
            builder.Property(i => i.Name)
               .IsRequired();
            builder.Property(i => i.ProjectId)
                .IsRequired();

            builder.HasOne(s => s.Project)
                .WithMany(i => i.Walls)
                .HasForeignKey(s => s.ProjectId);
        }
    }
}
