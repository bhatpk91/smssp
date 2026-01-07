// 1. ಗ್ಲೋಬಲ್ ವೇರಿಯೇಬಲ್‌ಗಳು (ಎಲ್ಲಾ ಫಂಕ್ಷನ್‌ಗಳಿಗೆ ಸಿಗುವಂತೆ ಇಲ್ಲಿರಲಿ)
var filteredData = []; 
var currentPage = 1;
var rowsPerPage = 10;

window.onload = function() {
    var searchInput = document.getElementById('search');
    var rowsSelect = document.getElementById('rowsPerPage');
    var tableBody = document.getElementById('catalog-body');
    var stats = document.getElementById('stats');
    var paginationDiv = document.getElementById('pagination');

    if (!searchInput || !tableBody) return;

    // 2. ಟೇಬಲ್ ಪ್ರದರ್ಶಿಸುವ ಫಂಕ್ಷನ್
    function renderTable() {
        tableBody.innerHTML = "";
        var searchTerm = searchInput.value.trim();

        // ಆರಂಭದಲ್ಲಿ ಅಥವಾ ಸರ್ಚ್ ಬಾಕ್ಸ್ ಖಾಲಿ ಇದ್ದಾಗ ಸಂದೇಶ
        if (searchTerm === "" && filteredData.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="14" style="text-align:center; padding:30px; color:#999; font-size: 18px;">ಮಾಹಿತಿಗಾಗಿ ಮೇಲೆ ಹುಡುಕಿ. (ಉದಾ: ರಾಮಾಯಣ, 1700, ಇತ್ಯಾದಿ)</td></tr>';
            if (paginationDiv) paginationDiv.innerHTML = "";
            return;
        }

        // ಪೇಜಿನೇಶನ್ ಲೆಕ್ಕಾಚಾರ
        var start = (currentPage - 1) * rowsPerPage;
        var end = start + parseInt(rowsPerPage);
        var pageData = filteredData.slice(start, end);

        if (pageData.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="14" style="text-align:center; padding:30px; color:red; font-size: 18px;">ಯಾವುದೇ ಫಲಿತಾಂಶ ಸಿಕ್ಕಿಲ್ಲ.</td></tr>';
            if (paginationDiv) paginationDiv.innerHTML = "";
            return;
        }

        var rowsHTML = "";
        for (var i = 0; i < pageData.length; i++) {
            var item = pageData[i];
            rowsHTML += "<tr style='border-bottom: 1px solid #eee;'>" +
                "<td>" + (item["SL.No"] || "") + "</td>" +
                "<td>" + (item["Ass.No"] || "") + "</td>" +
                "<td style='padding:10px; font-weight:bold; color:#800000;'>" + (item["Subject"] || "") + "</td>" +
                "<td>" + (item["Author"] || "") + "</td>" +
                "<td>" + (item["Column1"] || "") + "</td>" +
                "<td>" + (item["Material"] || "") + "</td>" +
                "<td>" + (item["Script"] || "") + "</td>" +
                "<td>" + (item["Size"] || "") + "</td>" +
                "<td>" + (item["No.Folios"] || "") + "</td>" +
                "<td>" + (item["No. of lines in Pages"] || "") + "</td>" +
                "<td>" + (item["No.of letter per line "] || "") + "</td>" +
                "<td>" + (item["Extent"] || "") + "</td>" +
                "<td>" + (item["Condition"] || "") + "</td>" +
                "<td>" + (item["Additional In fo"] || "") + "</td>" +
                "</tr>";
        }
        tableBody.innerHTML = rowsHTML;
        setupPagination();
    }

    // 3. ಪೇಜಿನೇಶನ್ ಬಟನ್ ತಯಾರಿಕೆ
    function setupPagination() {
        if (!paginationDiv) return;
        paginationDiv.innerHTML = "";
        var pageCount = Math.ceil(filteredData.length / rowsPerPage);
        if (pageCount <= 1) return;

        var prevBtn = document.createElement("button");
        prevBtn.innerHTML = "« Previous";
        prevBtn.style.cssText = "padding: 8px 16px; cursor: pointer; background: #5d4037; color: white; border: none; border-radius: 5px; margin-right: 10px;";
        if (currentPage === 1) {
            prevBtn.style.background = "#ccc";
            prevBtn.disabled = true;
        }
        prevBtn.onclick = function() { 
            currentPage--; 
            renderTable(); 
            window.scrollTo(0, document.getElementById('catalog').offsetTop);
        };
        paginationDiv.appendChild(prevBtn);

        var info = document.createElement("span");
        info.innerHTML = " ಪುಟ <b>" + currentPage + "</b> / <b>" + pageCount + "</b> ";
        info.style.color = "#5d4037";
        paginationDiv.appendChild(info);

        var nextBtn = document.createElement("button");
        nextBtn.innerHTML = "Next »";
        nextBtn.style.cssText = "padding: 8px 16px; cursor: pointer; background: #5d4037; color: white; border: none; border-radius: 5px; margin-left: 10px;";
        if (currentPage === pageCount) {
            nextBtn.style.background = "#ccc";
            nextBtn.disabled = true;
        }
        nextBtn.onclick = function() { 
            currentPage++; 
            renderTable(); 
            window.scrollTo(0, document.getElementById('catalog').offsetTop);
        };
        paginationDiv.appendChild(nextBtn);
    }

    // 4. ಸರ್ಚ್ ಫಂಕ್ಷನ್
    searchInput.oninput = function() {
        var term = searchInput.value.toLowerCase().trim();
        currentPage = 1; 

        if (term === "") {
            filteredData = [];
            stats.innerHTML = "ಹುಡುಕಲು ಟೈಪ್ ಮಾಡಿ...";
        } else if (typeof catalogData !== 'undefined') {
            filteredData = catalogData.filter(function(item) {
                var subject = (item["Subject"] || "").toString().toLowerCase();
                var author = (item["Author"] || "").toString().toLowerCase();
                var assNo = (item["Ass.No"] || "").toString().toLowerCase();
                var title = (item["Column1"] || "").toString().toLowerCase();
                return subject.includes(term) || author.includes(term) || assNo.includes(term) || title.includes(term);
            });
            stats.innerHTML = "ಒಟ್ಟು <b>" + filteredData.length + "</b> ಫಲಿತಾಂಶಗಳು ಸಿಕ್ಕಿವೆ.";
        }
        renderTable();
    };

    if (rowsSelect) {
        rowsSelect.onchange = function() {
            rowsPerPage = this.value;
            currentPage = 1;
            renderTable();
        };
    }

    renderTable();
};

// 5. ಎಕ್ಸೆಲ್ ಎಕ್ಸ್‌ಪೋರ್ಟ್ (ಇದು window ಫಂಕ್ಷನ್ ಆಗಿರಲಿ)
window.exportToExcel = function() {
    if (filteredData.length === 0) {
        alert("ಹುಡುಕಿದ ಫಲಿತಾಂಶ ಖಾಲಿ ಇದೆ! ಮೊದಲು ಸರ್ಚ್ ಮಾಡಿ.");
        return;
    }
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(wb, ws, "Manuscripts");
    XLSX.writeFile(wb, "Dharmasthala_Manuscript_Data.xlsx");
};

// 6. ಪ್ರಿಂಟ್ ಫಂಕ್ಷನ್
window.printTable = function() {
    if (filteredData.length === 0) {
        alert("ಪ್ರಿಂಟ್ ಮಾಡಲು ಯಾವುದೇ ಮಾಹಿತಿ ಇಲ್ಲ!");
        return;
    }
    var printContent = document.querySelector('.table-wrap').innerHTML;
    var printWindow = window.open('', '', 'height=600,width=1000');
    printWindow.document.write('<html><head><title>Manuscript Print</title>');
    printWindow.document.write('<style>table{width:100%; border-collapse:collapse; font-family: sans-serif;} th,td{border:1px solid #333; padding:8px; text-align:left; font-size:11px;} th{background:#5d4037; color:white;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h2 style="text-align:center;">ಶ್ರೀ ಕ್ಷೇತ್ರ ಧರ್ಮಸ್ಥಳ - ಹಸ್ತಪ್ರತಿಗಳ ಮಾಹಿತಿ</h2>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    setTimeout(function() {
        printWindow.print();
    }, 500);
};

// 7. ಟಾಗಲ್ ಫಂಕ್ಷನ್
window.toggleSearchArea = function() {
    var searchArea = document.getElementById('search-main-area');
    var initArea = document.getElementById('search-init-area');
    if (searchArea && initArea) {
        searchArea.style.display = "block";
        initArea.style.display = "none";
        document.getElementById('search').focus();
    }
};