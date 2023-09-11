namespace TileDesign.Data.Models
{
    public class Sample
    {
        public string Id { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string? ImageId { get; set; }
        public ImageDb? Image { get; set; }
        public string ProjectId { get; set; }
        public Project? Project { get; set; }
    }
}
