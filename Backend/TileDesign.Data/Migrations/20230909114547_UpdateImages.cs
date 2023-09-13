using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TileDesign.Data.Migrations
{
    public partial class UpdateImages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Samples_Images_ImageId",
                table: "Samples");

            migrationBuilder.DropForeignKey(
                name: "FK_Tiles_Images_ImageId",
                table: "Tiles");

            migrationBuilder.AlterColumn<string>(
                name: "ImageId",
                table: "Tiles",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ImageId",
                table: "Samples",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Bytes",
                table: "Images",
                type: "BLOB",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddForeignKey(
                name: "FK_Samples_Images_ImageId",
                table: "Samples",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tiles_Images_ImageId",
                table: "Tiles",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Samples_Images_ImageId",
                table: "Samples");

            migrationBuilder.DropForeignKey(
                name: "FK_Tiles_Images_ImageId",
                table: "Tiles");

            migrationBuilder.DropColumn(
                name: "Bytes",
                table: "Images");

            migrationBuilder.AlterColumn<string>(
                name: "ImageId",
                table: "Tiles",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "ImageId",
                table: "Samples",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_Samples_Images_ImageId",
                table: "Samples",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tiles_Images_ImageId",
                table: "Tiles",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }
    }
}
