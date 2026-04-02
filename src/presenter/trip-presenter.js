import { render, RenderPosition } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class TripPresenter {
  #filtersComponent = null;
  #sortComponent = null;
  #currentEditComponent = null;
  #currentPointComponent = null;
  #eventsContainer = null;

  constructor() {
    this.#filtersComponent = new FiltersView();
    this.#sortComponent = new SortView();
  }

  init() {
    const filtersContainer = document.querySelector('.trip-controls__filters');
    this.#eventsContainer = document.querySelector('.trip-events');

    if (filtersContainer) {
      render(this.#filtersComponent, filtersContainer, RenderPosition.BEFOREEND);
    }

    if (this.#eventsContainer) {
      render(this.#sortComponent, this.#eventsContainer, RenderPosition.BEFOREEND);

      const points = this.#getMockPoints();

      points.forEach((point) => {
        this.#renderPoint(point);
      });
    }
  }

  #getMockPoints() {
    return [
      {
        id: '1',
        type: 'Flight',
        destination: { name: 'Amsterdam' },
        dateFrom: '2024-03-18T10:30:00',
        dateTo: '2024-03-18T11:30:00',
        basePrice: 160,
        offers: [],
        isFavorite: false
      },
      {
        id: '2',
        type: 'Bus',
        destination: { name: 'Geneva' },
        dateFrom: '2024-03-19T09:00:00',
        dateTo: '2024-03-19T10:30:00',
        basePrice: 80,
        offers: [],
        isFavorite: false
      },
      {
        id: '3',
        type: 'Sightseeing',
        destination: { name: 'Chamonix' },
        dateFrom: '2024-03-20T14:00:00',
        dateTo: '2024-03-20T16:00:00',
        basePrice: 50,
        offers: [],
        isFavorite: false
      }
    ];
  }

  #replacePointToEdit(pointComponent, editPointComponent) {
    const pointElement = pointComponent.element;
    const editElement = editPointComponent.element;

    pointElement.replaceWith(editElement);

    this.#currentEditComponent = editPointComponent;
    this.#currentPointComponent = pointComponent;
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditToPoint(pointComponent, editPointComponent) {
    const editElement = editPointComponent.element;
    const pointElement = pointComponent.element;

    editElement.replaceWith(pointElement);

    this.#currentEditComponent = null;
    this.#currentPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #renderPoint(point) {
    const pointComponent = new PointView(point);
    const editPointComponent = new EditPointView(point);

    const handlePointToEdit = () => {
      this.#replacePointToEdit(pointComponent, editPointComponent);
    };

    const handleEditToPoint = () => {
      this.#replaceEditToPoint(pointComponent, editPointComponent);
    };

    pointComponent.setRollupClickHandler(handlePointToEdit);

    editPointComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      handleEditToPoint();
    });

    editPointComponent.setRollupClickHandler(handleEditToPoint);
    editPointComponent.setCancelClickHandler(handleEditToPoint);

    render(pointComponent, this.#eventsContainer, RenderPosition.BEFOREEND);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' && this.#currentEditComponent && this.#currentPointComponent) {
      evt.preventDefault();
      this.#replaceEditToPoint(this.#currentPointComponent, this.#currentEditComponent);
    }
  };
}
