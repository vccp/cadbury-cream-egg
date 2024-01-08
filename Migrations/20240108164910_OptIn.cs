using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cadbury.CremeEgg.Quiz.Migrations
{
    /// <inheritdoc />
    public partial class OptIn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Entries_Market_Email",
                table: "Entries");

            migrationBuilder.CreateIndex(
                name: "IX_Entries_Market_Email",
                table: "Entries",
                columns: new[] { "Market", "Email" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Entries_Market_Email",
                table: "Entries");

            migrationBuilder.CreateIndex(
                name: "IX_Entries_Market_Email",
                table: "Entries",
                columns: new[] { "Market", "Email" });
        }
    }
}
