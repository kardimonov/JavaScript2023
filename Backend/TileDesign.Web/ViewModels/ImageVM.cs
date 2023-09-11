using Microsoft.AspNetCore.Http;

namespace TileDesign.Web.ViewModels
{
    public class ImageVM
    {
        public string Id { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string Name { get; set; }
        public IFormFile Blob { get; set; }
        public string ProjectId { get; set; }
    }
}
