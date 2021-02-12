import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class AbstractService {

    /**
     * Http service, used to call api
     */
    http: HttpClient;
    uri: string;

    /**
     * Constructor of Abstract service, initializing Http service
     * //@param http
     */
    constructor(http: HttpClient, uri?: string) {
        this.http = http;
    }

    getAll<T>(): Observable<T[]> {
        return this.http.get<T[]>(`localhost:3001/${this.uri}`)
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
