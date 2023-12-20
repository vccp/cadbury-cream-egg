using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cadbury.CremeEgg.Quiz.Migrations
{
    /// <inheritdoc />
    public partial class Markets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Market",
                table: "Entries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Entries_Market",
                table: "Entries",
                column: "Market");

            migrationBuilder.CreateIndex(
                name: "IX_Entries_Market_Email",
                table: "Entries",
                columns: new[] { "Market", "Email" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Entries_Market",
                table: "Entries");

            migrationBuilder.DropIndex(
                name: "IX_Entries_Market_Email",
                table: "Entries");

            migrationBuilder.DropColumn(
                name: "Market",
                table: "Entries");
        }
    }
}
