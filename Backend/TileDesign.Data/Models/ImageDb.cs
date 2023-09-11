﻿using System.Collections.Generic;

namespace TileDesign.Data.Models
{
    public class ImageDb
    {
        public string Id { get; set; }
        public int? Width { get; set; }
        public int? Height { get; set; }
        public string? Name { get; set; }
        public byte[]? Bytes { get; set; }
        public string ProjectId { get; set; }
        public Project? Project { get; set; }
        public List<Sample>? Samples { get; set; }
        public List<Tile>? Tiles { get; set; }
    }
}
