using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TileDesign.Web.Services;
using TileDesign.Web.ViewModels;

namespace TileDesign.Web.Controllers
{
    /// <summary>
    /// Контроллер для работы c дизайном плитки
    /// </summary>
    /// <returns></returns>
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TileController : ControllerBase
    {
        private readonly ITileService _service;

        public TileController(ITileService service)
        {
            _service = service;
        }

        /// <summary>
        /// Получение проекта по id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET: /Tile/GetProjectById
        [HttpGet]
        public async Task<IActionResult> GetProjectById(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Некорректные данные в запросе");
            }

            var res = await _service.GetProjectById(id);
            return Ok(res);
        }

        /// <summary>
        /// Получение всех проектов пользователя
        /// </summary>
        /// <returns></returns>
        // GET: api/Tile/GetAllProjects
        [HttpGet]
        public async Task<IActionResult> GetAllProjects()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Некорректные данные в запросе");
            }

            var res = await _service.GetAllProjects();
            return Ok(res);
        }

        /// <summary>
        /// Сохранение проекта
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        // POST: api/Tile/AddProject
        [HttpPost]
        public async Task<IActionResult> AddProject([FromBody] ProjectVM model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Некорректные данные в запросе");
            }
            await _service.AddProject(model);
            return Ok();
        }

        /// <summary>
        /// Получение картинки по id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET: api/Tile/GetImageById
        [HttpGet]
        public async Task<IActionResult> GetImageById(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Некорректные данные в запросе");
            }

            var file = await _service.GetImageById(id);
            return file.Bytes == null 
                    ? NotFound()
                    : File(file.Bytes, file.ContentType);
        }

        /// <summary>
        /// Сохранение картинки
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        // POST: api/Tile/AddImage
        [HttpPost]
        public async Task<IActionResult> AddImage([FromForm] ImageVM model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Некорректные данные в запросе");
            }
            await _service.UpdateImage(model);
            return Ok();
        }
    }
}
