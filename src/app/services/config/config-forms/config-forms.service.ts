import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigFormsService {

  public static inputs: any;
  public static forms: any;

  constructor(private http: HttpClient) { }

  
  configLoad (): void {
    const jsonInputs = `/assets/config/form-input-list.json`;
    const jsonForms = `/assets/config/form-category-list.json`;
    this.http.get(jsonInputs).subscribe((data) => {
      ConfigFormsService.inputs = data;
    })
    this.http.get(jsonForms).subscribe((data) => {
      ConfigFormsService.forms = data;
    })
  };

  loadPromise() {
    const jsonInputs = `/assets/config/form-input-list.json`;
    const jsonForms = `/assets/config/form-category-list.json`;

    const configInputsPromise =  new Promise((resolve, reject) => {
      this.http.get(jsonInputs).toPromise().then((response: any ) => {
        if (response && typeof(response) === 'object') {
          ConfigFormsService.inputs = response;
          const config = ConfigFormsService.inputs;
          if (config) {
            resolve(config);
          } else {
            reject('Ошибка при инициализации конфига - неверный формат '+ config);
          }
        } else {
          reject('Ошибка при инициализации конфига - неверный формат ответа '+ response);
        }
      }).catch((response: any) => {
        reject(`Ошибка при загрузки файла '${jsonInputs}': ${JSON.stringify(response)}`);
      });
    });

    const configFormsPromise =  new Promise((resolve, reject) => {
      this.http.get(jsonForms).toPromise().then((response: any ) => {
        if (response && typeof(response) === 'object') {
          ConfigFormsService.forms = response;
          const config = ConfigFormsService.forms;
          if (config) {
            resolve(config);
          } else {
            reject('Ошибка при инициализации конфига - неверный формат '+ config);
          }
        } else {
          reject('Ошибка при инициализации конфига - неверный формат ответа '+ response);
        }
      }).catch((response: any) => {
        reject(`Ошибка при загрузки файла '${jsonForms}': ${JSON.stringify(response)}`);
      });
    });

    const configPromiseError = new Promise<void>((resolve, reject) => {})
    const promiseArr = [configInputsPromise, configFormsPromise];
    return Promise.all(promiseArr);
  };
}
