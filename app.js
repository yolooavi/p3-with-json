function loadSection(section) {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const sectionContent = document.getElementById('sectionContent');
        const titleContent = document.getElementById('titleContent');
        if (sectionContent) {  
          if (section === 'about') {
            const aboutContent = data.section.aboutAgency;
            const videoContent = data.section.videoSection;

            titleContent.innerHTML = sectionContent.title;

            sectionContent.innerHTML = `
              <section>
               <p>${aboutContent.content}</p>
                <h3>${videoContent.title}</h3>
                <p>${videoContent.description}</p>
                <video src="${videoContent.video.src}" controls width="${videoContent.video.width}">
                </video>
              </section>
            `;
          }
        } else {
          console.error('Element with id "sectionContent" not found');
        }
       
            if (sectionContent) {  
                if (section === 'cats') {
                    const gatosContent = data.section.gatos;
                    if (gatosContent && gatosContent.table) { 
                        const tableHeaders = gatosContent.table.headers;
                        const tableRows = gatosContent.table.rows;
                    
              
                  let tableHtml = '<table><thead><tr>';
                  tableHeaders.forEach(header => {
                    tableHtml += `<th>${header}</th>`;
                  });
                  tableHtml += '</tr></thead><tbody>';
              
                  tableRows.forEach(row => {
                    tableHtml += `<tr>
                                    <td>${row.numero}</td>
                                    <td><img src="${row.foto}" alt="${row.nombre}" width="100"></td>
                                    <td>${row.nombre}</td>
                                    <td>${row.fecha_nacimiento}</td>
                                    <td>${row.raza}</td>
                                    <td>${row.caracter}</td>
                                  </tr>`;
                  });
              
                  tableHtml += '</tbody></table>';

                  titleContent.innerHTML = gatosContent.title;
              
                  sectionContent.innerHTML = `
                    <section>
                      ${tableHtml}
                    </section>
                  `;
                    }}

              } else {
                console.error('Element with id "sectionContent" not found');
              }

              if (sectionContent) {
                if (section === 'location') {
                    
                  const ubicacionContent = data.section.ubicacion;
                  if (ubicacionContent && ubicacionContent.section) {
                  const address = ubicacionContent.section.address;
                  const map = ubicacionContent.section.map;
              
                  const addressHtml = `
                    <p>${address.line1}</p>
                    <p>${address.line2}</p>
                    <p>${address.line3}</p>
                    <p>${address.line4}</p>
                  `;
              
                  const mapHtml = `
                    <iframe src="${map.src}" width="${map.width}" height="${map.height}" style="${map.style}" allowfullscreen="${map.allowfullscreen}" loading="${map.loading}"></iframe>
                  `;
              
                  titleContent.innerHTML = ubicacionContent.title;

                  sectionContent.innerHTML = `
                    <section>
                      <h3>${ubicacionContent.section.subtitle}</h3>
                      ${addressHtml}
                      ${mapHtml}
                    </section>
                  `;
                }
            
            }
              } else {
                console.error('Element with id "sectionContent" not found');
              }
              if (sectionContent) {
                if (section === 'adoptionForm') {
                    if (data.section?.adoptionForm) {
                        const adoptionForm = data.section.adoptionForm;
                        titleContent.innerHTML = adoptionForm.title;
            
                        let formHtml = `
                            <div class="container my-4">
                                <form action="${adoptionForm.action || '#'}" method="post">
                        `;
            
                        const formFields = adoptionForm.formFields;
            
                        const personalData = formFields.personalData;
                        formHtml += `<fieldset><legend>${personalData.legend}</legend>`;
                        personalData.fields.forEach(field => {
                            formHtml += `
                                <label for="${field.id}">${field.label}</label>
                                <input type="${field.type}" id="${field.id}" name="${field.name}" class="form-control w-100" ${field.required ? 'required' : ''}>
                            `;
                        });
                        formHtml += `</fieldset>`;
            
                        const catSelection = formFields.catSelection;
                        formHtml += `<fieldset><legend>${catSelection.legend}</legend>`;
                        catSelection.fields.forEach(field => {
                            if (field.type === 'select') {
                                formHtml += `
                                    <label for="${field.id}">${field.label}</label>
                                    <select id="${field.id}" name="${field.name}" class="form-control w-100" ${field.required ? 'required' : ''}>
                                        ${field.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                                    </select>
                                `;
                            } else if (field.type === 'textarea') {
                                formHtml += `
                                    <label for="${field.id}">${field.label}</label>
                                    <textarea id="${field.id}" name="${field.name}" class="form-control w-100" rows="${field.rows}" cols="${field.cols}" ${field.required ? 'required' : ''}></textarea>
                                `;
                            }
                        });
                        formHtml += `</fieldset>`;
            
                        const adoptionConditions = formFields.adoptionConditions;
                        formHtml += `<fieldset><legend>${adoptionConditions.legend}</legend>`;
                        adoptionConditions.fields.forEach(field => {
                            if (field.type === 'radio') {
                                formHtml += `
                                    <div class="input-group">
                                        <label>${field.label}</label>
                                        ${field.options.map(option => `
                                            <input type="radio" id="${option.id}" name="${field.name}" value="${option.value}" ${field.required ? 'required' : ''}>
                                            <label for="${option.id}">${option.label}</label>
                                        `).join('')}
                                    </div>
                                `;
                            } else if (field.type === 'checkbox') {
                                formHtml += `
                                    <div class="input-group">
                                        <input type="checkbox" id="${field.id}" name="${field.name}">
                                        <label for="${field.id}">${field.label}</label>
                                    </div>
                                `;
                            }
                        });
                        formHtml += `</fieldset>`;
            
                        formHtml += `
                            <div class="form-buttons">
                                ${adoptionForm.buttons.map(button => `
                                    <input type="${button.type}" class="btn btn-success" value="${button.value}">
                                `).join('')}
                            </div>
                            </form>
                            </div>
                        `;
            
                        sectionContent.innerHTML = formHtml;
                    }
                }
            } else {
                console.error('Element with id "sectionContent" not found');
            }            
      })
      .catch(error => console.error('Error loading JSON data:', error));
  }
  