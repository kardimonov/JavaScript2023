using System.Collections.Generic;

namespace TileDesign.Web.ViewModels
{
    public class ProjectVM
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<WallVM> Walls { get; set; }
        public List<string> Images { get; set; }
        public List<SampleVM> Samples { get; set; }
        public List<TileVM> Tiles { get; set; }
    }
}
