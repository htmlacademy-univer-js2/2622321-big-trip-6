import { render, RenderPosition } from '../render.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointsModel from '../model/points-model.js';

export default class TripPresenter {
  constructor() {
    this.pointsModel = new PointsModel();
    this.filtersComponent = new FiltersView();
    this.sortComponent = new SortView();
  }

  init() {
    const filtersContainer = document.querySelector('.trip-controls__filters');
    const eventsContainer = document.querySelector('.trip-events');
    const points = this.pointsModel.getPoints();

    if (filtersContainer) {
      render(this.filtersComponent, filtersContainer, RenderPosition.BEFOREEND);
    }

    if (eventsContainer) {
      render(this.sortComponent, eventsContainer, RenderPosition.BEFOREEND);

      const editPointComponent = new EditPointView(points[0]);
      render(editPointComponent, eventsContainer, RenderPosition.BEFOREEND);

      points.forEach((point) => {
        const pointComponent = new PointView(point);
        render(pointComponent, eventsContainer, RenderPosition.BEFOREEND);
      });
    }
  }
}
