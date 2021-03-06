import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class AbstractService {

    /**
     * Http service, used to call api
     */
    http: HttpClient;

    // api uri
    uri: string;

    /**
     * Constructor of Abstract service, initializing Http service
     * //@param http
     */
    constructor(http: HttpClient, uri?: string) {
        this.http = http;
        this.uri = uri;
    }

    /**
     * getAll api function
     */
    public getAll<T>(): Observable<T[]> {
        return this.http.get<T[]>(`${environment.api}/${this.uri}`);
    }

    /**
     * Get all data from uri by adding headers data
     * @param values headers data
     */
    public getAllWithHeader<T>(
        values: { 
            [key: string]: any 
        }): Observable<T[]> {
        const options = { headers: new HttpHeaders(values) };
        return this.http.get<T[]>(`${environment.api}/${this.uri}`, options);
    } 

    /**
     * Return options needed for api call
     * @param verb verb to override in call */
    getOptions(verb: string) {
        const options = { headers: new HttpHeaders({ 'X-HTTP-Method-Override': verb }) };
        return options;
    }

    /**
     * Download from a URL.
     * @param downloadUrl the URL to download.
     */
    protected Download(downloadUrl: string): void {
      const iframe = document.getElementById('ifr-download-file') as HTMLIFrameElement;
      iframe.src = downloadUrl;
    }
}
