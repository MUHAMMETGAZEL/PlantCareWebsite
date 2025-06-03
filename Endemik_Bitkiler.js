/*document.addEventListener('DOMContentLoaded', function() {
    const bitkiler = [
        { adi: 'Kazdağı Göknarı', bilimselAdi: 'Abies nordmanniana subsp. equi-trojani', toprak: 'İyi drene toprak', sulama: 'Haftada 1-2 kez', gunes: 'Tam güneş', foto: 'https://example.com/elma.jpg' },
        { adi: 'Anadolu Sığla Ağacı', bilimselAdi: 'Liquidambar orientalis', toprak: 'Nemli toprak', sulama: 'Nemli tutulmalı', gunes: 'Kısmi gölge', foto: 'https://example.com/domates.jpg' },
        // Diğer bitkiler buraya eklenecek
    ];
    
    const tableBody = document.querySelector('#bitkiTable tbody');
    const commentList = document.querySelector('#commentList');

    function loadTableData() {
        tableBody.innerHTML = '';
        bitkiler.forEach((bitki, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${bitki.adi}</td>
                <td>${bitki.bilimselAdi}</td>
                <td>${bitki.toprak}</td>
                <td>${bitki.sulama}</td>
                <td>${bitki.gunes}</td>
                <td><img src="${bitki.foto}" alt="${bitki.adi}" width="100" height="100"></td>
                <td>
                    <button onclick="editRow(${index})">Düzenle</button>
                    <button onclick="deleteRow(${index})">Sil</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    window.addRow = function() {
        const newRow = { adi: '', bilimselAdi: '', toprak: '', sulama: '', gunes: '', foto: '' };
        bitkiler.push(newRow);
        loadTableData();
        editRow(bitkiler.length - 1);
    };
    
    window.editRow = function(index) {
        const row = tableBody.rows[index];
        const bitki = bitkiler[index];
        
        row.innerHTML = `
            <td><input type="text" value="${bitki.adi}" /></td>
            <td><input type="text" value="${bitki.bilimselAdi}" /></td>
            <td><input type="text" value="${bitki.toprak}" /></td>
            <td><input type="text" value="${bitki.sulama}" /></td>
            <td><input type="text" value="${bitki.gunes}" /></td>
            <td><input type="file" onchange="previewFile(${index}, event)" /></td>
            <td>
                <button onclick="saveRow(${index})">Kaydet</button>
                <button onclick="loadTableData()">İptal</button>
            </td>
        `;
    };
    
    window.previewFile = function(index, event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onloadend = function() {
            bitkiler[index].foto = reader.result;
            loadTableData();
        };
        
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    
    window.saveRow = function(index) {
        const row = tableBody.rows[index];
        const inputs = row.querySelectorAll('input[type="text"]');
        
        bitkiler[index] = {
            adi: inputs[0].value,
            bilimselAdi: inputs[1].value,
            toprak: inputs[2].value,
            sulama: inputs[3].value,
            gunes: inputs[4].value,
            foto: bitkiler[index].foto,
        };
        
        loadTableData();
    };
    
    window.deleteRow = function(index) {
        bitkiler.splice(index, 1);
        loadTableData();
    };
    
    window.addComment = function() {
        const commentName = document.getElementById('commentName').value;
        const commentText = document.getElementById('commentText').value;
        
        if (commentName && commentText) {
            const commentItem = document.createElement('li');
            commentItem.textContent = `${commentName}: ${commentText}`;
            commentList.appendChild(commentItem);
            
            document.getElementById('commentName').value = '';
            document.getElementById('commentText').value = '';
        }
    };
    
    loadTableData();
    window.searchTable = function() {
        const input = document.getElementById('searchInput');
        const filter = input.value.toLowerCase();
        const rows = tableBody.getElementsByTagName('tr');
        
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            const cell = cells[0];
            if (cell) {
                const txtValue = cell.textContent || cell.innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }  }}     
});

*/
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#bitkiTable tbody');
    const bitkiler = [];

    function loadTableData() {
        fetch('http://localhost:5002/bitkiler')
            .then(response => response.json())
            .then(data => {
                bitkiler.length = 0;
                tableBody.innerHTML = '';
                data.forEach((bitki, index) => {
                    bitkiler.push({
                        id: bitki[0], 
                        adi: bitki[1],
                        bilimselAdi: bitki[2],
                        toprak: bitki[3],
                        sulama: bitki[4],
                        gunes: bitki[5],
                        foto: bitki[6]
                    });
                    
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${bitki[1]}</td>
                        <td>${bitki[2]}</td>
                        <td>${bitki[3]}</td>
                        <td>${bitki[4]}</td>
                        <td>${bitki[5]}</td>
                        <td><img src="${bitki[6]}" alt="${bitki[1]}" width="100" height="100"></td>
                        <td>
                            <button onclick="editRow(${index})">Düzenle</button>
                            <button onclick="deleteRow(${index})">Sil</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            });
    }

    window.addRow = function() {
        const newRow = { adi: '', bilimselAdi: '', toprak: '', sulama: '', gunes: '', foto: '' };
        bitkiler.push(newRow);
        const index = bitkiler.length - 1;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" value="${newRow.adi}" /></td>
            <td><input type="text" value="${newRow.bilimselAdi}" /></td>
            <td><input type="text" value="${newRow.toprak}" /></td>
            <td><input type="text" value="${newRow.sulama}" /></td>
            <td><input type="text" value="${newRow.gunes}" /></td>
            <td><input type="file" onchange="previewFile(${index}, event)" /></td>
            <td>
                <button onclick="saveRow(${index})">Kaydet</button>
                <button onclick="loadTableData()">İptal</button>
            </td>
        `;
        tableBody.appendChild(row);
    };
window.loadTableData = loadTableData;
    window.editRow = function(index) {
        const row = tableBody.rows[index];
        const bitki = bitkiler[index];
        
        row.innerHTML = `
            <td><input type="text" value="${bitki.adi}" /></td>
            <td><input type="text" value="${bitki.bilimselAdi}" /></td>
            <td><input type="text" value="${bitki.toprak}" /></td>
            <td><input type="text" value="${bitki.sulama}" /></td>
            <td><input type="text" value="${bitki.gunes}" /></td>
            <td><input type="file" onchange="previewFile(${index}, event)" /></td>
            <td>
                <button onclick="saveRow(${index})">Kaydet</button>
                <button onclick="loadTableData()">İptal</button>
            </td>
        `;
    };

    window.previewFile = function(index, event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onloadend = function() {
            bitkiler[index].foto = reader.result;
        };
        
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    window.saveRow = function(index) {
        const row = tableBody.rows[index];
        const inputs = row.querySelectorAll('input[type="text"]');
        
        bitkiler[index] = {
            id: bitkiler[index].id,
            adi: inputs[0].value,
            bilimselAdi: inputs[1].value,
            toprak: inputs[2].value,
            sulama: inputs[3].value,
            gunes: inputs[4].value,
            foto: bitkiler[index].foto,
        };

        fetch(`http://localhost:5002/bitkiler${bitkiler[index].id ? '/' + bitkiler[index].id : ''}`, {
            method:  bitkiler[index].id ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bitkiler[index])
        }).then(response => {
            if (response.ok) {
                loadTableData();
            } else {
                console.error('Kaydetme hatası:', response.statusText);
            }
        });
    };

    window.deleteRow = function(index) {
        const bitki = bitkiler[index];
        if (bitki.id) {
            fetch(`http://localhost:5002/bitkiler/${bitki.id}`, {
                method: 'DELETE'
            }).then(response => {
                if (response.ok) {
                    loadTableData();
                } else {
                    console.error('Silme hatası:', response.statusText);
                }
            });
        } else {
            console.error('Bitki ID undefined.');
        }
    };
    

    window.addComment = function() {
        const commentName = document.getElementById('commentName').value;
        const commentText = document.getElementById('commentText').value;
        
        if (commentName && commentText) {
            const commentItem = document.createElement('li');
            commentItem.textContent = `${commentName}: ${commentText}`;
            commentList.appendChild(commentItem);
            
            document.getElementById('commentName').value = '';
            document.getElementById('commentText').value = '';
        }
    };

    window.searchTable = function() {
        const input = document.getElementById('searchInput');
        const filter = input.value.toLowerCase();
        const rows = tableBody.getElementsByTagName('tr');
        
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            const cell = cells[0];
            if (cell) {
                const txtValue = cell.textContent || cell.innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }       
        }
    };

    loadTableData();
});