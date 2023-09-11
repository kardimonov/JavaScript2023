using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TileDesign.Data.Models;

namespace TileDesign.Data.Configurations
{
    public class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.Property(e => e.Id)
                .IsRequired();
            builder.Property(e => e.Name)
                .IsRequired();
        }
    }
}
