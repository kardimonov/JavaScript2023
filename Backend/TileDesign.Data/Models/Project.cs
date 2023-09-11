using System.Collections.Generic;

namespace TileDesign.Data.Models
{
    public class Project
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<Wall>? Walls { get; set; }
        public List<Sample>? Samples { get; set; }
        public List<ImageDb>? Images { get; set; }
    }
}
