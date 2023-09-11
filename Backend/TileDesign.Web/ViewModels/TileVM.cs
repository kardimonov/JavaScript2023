namespace TileDesign.Web.ViewModels
{
    public class TileVM
    {
        public string Id { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int PosX { get; set; }
        public int PosY { get; set; }
        public string? ImageId { get; set; }
        public string WallId { get; set; }
    }
}
