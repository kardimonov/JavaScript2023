using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TileDesign.Data.Models;

namespace TileDesign.Data.Configurations
{
    public class SampleConfiguration : IEntityTypeConfiguration<Sample>
    {
        public void Configure(EntityTypeBuilder<Sample> builder)
        {
            builder.Property(i => i.Id)
                .IsRequired();
            builder.Property(i => i.Width)
                .IsRequired();
            builder.Property(i => i.Height)
                .IsRequired();
            builder.Property(i => i.ProjectId)
                .IsRequired();
            
            builder.HasOne(s => s.Image)
                .WithMany(i => i.Samples)
                .HasForeignKey(s => s.ImageId);
            builder.HasOne(s => s.Project)
                .WithMany(p => p.Samples)
                .HasForeignKey(s => s.ProjectId);
        }
    }
}
