import { History, Location } from 'history';
import { match } from 'react-router';

export interface ILocationAwareProps {
    history: History;
    location: Location;
    match: match;
}
