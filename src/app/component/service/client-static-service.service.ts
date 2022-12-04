import {Injectable} from '@angular/core';
import {Client} from '../entity/ClientWeb';

@Injectable({
  providedIn: 'root'
})
export class ClientStaticServiceService {

  constructor() {
  }


  getNameOfClient(cl: Client): string {
    if (cl?.typeClient) {
      return cl?.companyName ? cl?.companyName : '-';
    } else {
      const name = cl?.name ? cl?.name : '-';
      const family = cl?.family ? cl?.family : '-';
      return name + ' ' + family;
    }
  }

  getImeiOrEmailContainNA(target: string): string {
    if (!target) {
      return ' - ';
    } else if (target.includes('n/a')) {
      return ' - ';
    } else {
      return target;
    }
  }

  truncateChar(text: string, charlie: number): string {
    if (!text || text.length <= charlie) {
      return text;
    }
    return text.substring(0, charlie) + '...';
  }

  toCamelCase(str: string): string {
    if (!str) {
      return ' - ';
    }
    return str.trim()
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
