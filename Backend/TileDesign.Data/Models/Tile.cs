namespace TileDesign.Data.Models
{
    public class Tile
    {
        public string Id { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int PosX { get; set; }
        public int PosY { get; set; }
        public string? ImageId { get; set; }
        public ImageDb? Image { get; set; }
        public string WallId { get; set; }
        public Wall Wall { get; set; }
    }
}
