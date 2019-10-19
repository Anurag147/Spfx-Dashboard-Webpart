import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';
import {SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions} from '@microsoft/sp-http'; 
import { Dialog } from '@microsoft/sp-dialog';
import styles from './GoogleChartsWebPart.module.scss';
import * as strings from 'GoogleChartsWebPartStrings';
import 'jquery';
require('bootstrap');
var $: any = (window as any).$;

export interface IGoogleChartsWebPartProps {
  description: string;
}

export default class GoogleChartsWebPart extends BaseClientSideWebPart<IGoogleChartsWebPartProps> {

  public render(): void {
    //Load bootstrap css
    let cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);
    let className= styles.SupplierData;
    let labelClassName= styles.LabelCard;
    this.domElement.innerHTML = `
    <div class=${styles.googleCharts}>
      <div class="col-md- ${styles.Datacard}" id="ContractDetailsCards">
      </div>
      <div class="col-md-12">
      <table id="ContractDetailsTable" class=${styles.CustomTable}>
                              <th> Supplier Name </th>
                              <th> No. of Contracts </th>
                              <th> Annual Contract Value (in '000 USD)</th>
                              <th> Overall contract compliance % </th>
      </table>
      </div>
      <div class="col-md-12 ${styles.AddData}">
          <div class=${styles.AddDataHeader}>ADD NEW SUPPLIER</div>
          <form>
            <div class="form-group ${styles.NoMargin}">
              <label class="control-label col-sm-4 ${styles.TopPadding}" for="sName">Supplier Name:</label>
              <div class="col-sm-8 ${styles.TopPadding}">
                <input type="text" class="form-control" id="sName" placeholder="Supplier Name" name="sName">
              </div>
            </div>
            <div class="form-group ${styles.NoMargin}">
              <label class="control-label col-sm-4 ${styles.TopPadding}" for="noOfC">No. of Contracts:</label>
              <div class="col-sm-8 ${styles.TopPadding}">
                <input type="text" class="form-control" id="noOfC" placeholder="No. of Contracts" name="noOfC">
              </div>
            </div>
            <div class="form-group ${styles.NoMargin}">
              <label class="control-label col-sm-4 ${styles.TopPadding}" for="ACV">Annual Contract Value:</label>
              <div class="col-sm-8 ${styles.TopPadding}">
                <input type="text" class="form-control" id="ACV" placeholder="Annual Contract Value" name="ACV">
              </div>
            </div>
            <div class="form-group ${styles.NoMargin}">
              <label class="control-label col-sm-4 ${styles.TopPadding}" for="OCC">Overall contract compliance % :</label>
              <div class="col-sm-8 ${styles.TopPadding}">
                <input type="text" class="form-control" id="OCC" placeholder="Overall contract compliance %" name="OCC">
              </div>
            </div>
            <div class="form-group ${styles.NoMargin}">        
              <div class="col-sm-offset-4 col-sm-8 ${styles.TopPadding}" style="padding-bottom:20px;">
                <button type="button" class="btn btn-warning create">Submit</button>
              </div>
            </div>
          </form>
      </div>
    </div>`;

      this.LoadData(className,labelClassName);
      this.setButtonsEventHandlers();
  }

  public LoadData(className:string,labelClassName:string):void{
    this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/lists/getbytitle('SupplierData')/items?$select=SupplierName,NoOfContracts,AnnualContractValue,TotalContractValue`,  
      SPHttpClient.configurations.v1)  
      .then((response: SPHttpClientResponse) => {  
        response.json().then((responseJSON: any) => {  
          responseJSON["value"].forEach(element => {
            $('#ContractDetailsTable').append('<tr><td>'+element["SupplierName"]+'</td><td>'+element["NoOfContracts"]+'</td><td>'+element["AnnualContractValue"]+'</td><td>'+element["TotalContractValue"]+'</td></tr>');
            $('#ContractDetailsCards').append('<div class='+className+'><label class='+labelClassName+'>  Supplier: '+element["SupplierName"]+'</label><br/><label class='+labelClassName+'>  No. Of Contracts: '+element["NoOfContracts"]+'</label><br/><label class='+labelClassName+'>  Annual Value: '+element["AnnualContractValue"]+'</label><br/><label class='+labelClassName+'>  Total Value: '+element["TotalContractValue"]+'</label></div>');
          });  
        });  
      });

  }

  public setButtonsEventHandlers(): void { 
    this.domElement.querySelector('button.create').addEventListener('click', () => { this.CreateSPListItems(); });
  }

  public CreateSPListItems() : void{
    const body: string = JSON.stringify({  
      'SupplierName': $('#sName').val(),
      'NoOfContracts': $('#noOfC').val(),
      'AnnualContractValue': $('#ACV').val(),
      'TotalContractValue': $('#OCC').val(),
    });  
    
    this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('SupplierData')/items`,  
    SPHttpClient.configurations.v1,  
    {  
      headers: {  
        'Accept': 'application/json;odata=nometadata',  
        'Content-type': 'application/json;odata=nometadata',  
        'odata-version': ''  
      },  
      body: body  
    })  
    .then((response: SPHttpClientResponse): any => {  
      return response.json();  
    })  
    .then((): void => { 
      Dialog.alert("Data saved successfully"); 
      this.render();
    }, (error: any): void => {  
      Dialog.alert("Error while saving data in Sharepoint"); 
    });  
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
