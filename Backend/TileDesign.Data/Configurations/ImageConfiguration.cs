using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TileDesign.Data.Models;

namespace TileDesign.Data.Configurations
{
    public class ImageConfiguration : IEntityTypeConfiguration<ImageDb>
    {
        public void Configure(EntityTypeBuilder<ImageDb> builder)
        {
            builder.Property(i => i.Id)
                .IsRequired();
            builder.Property(i => i.ProjectId)
                .IsRequired();

            builder.HasOne(s => s.Project)
                .WithMany(i => i.Images)
                .HasForeignKey(s => s.ProjectId);
        }
    }
}
