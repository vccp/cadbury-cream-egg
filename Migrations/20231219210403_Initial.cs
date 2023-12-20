using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cadbury.CremeEgg.Quiz.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Entries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Answers = table.Column<string>(type: "nvarchar(5)", maxLength: 5, nullable: false),
                    TermsAndConditions = table.Column<bool>(type: "bit", nullable: false),
                    OptIn = table.Column<bool>(type: "bit", nullable: false),
                    CreationsDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false, defaultValueSql: "getutcdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entries", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Entries_Answers",
                table: "Entries",
                column: "Answers");

            migrationBuilder.CreateIndex(
                name: "IX_Entries_OptIn",
                table: "Entries",
                column: "OptIn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Entries");
        }
    }
}
