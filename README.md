# examenFinalWeb
Final exam for the class of Web Development in the University of los Andes, with the professor John A. Guerra.
Following the instructions [here](https://beta.observablehq.com/@john-guerra/sf-muni-schedule) and using nextbus API.
  ### Errors found
  - When setting the scale take first element instead of second so that all values fit the scale.
  - Sometimes nextbus API will not give you an array with one element (when there is only one element) so it's needed to handdle this error and transform the value into an array.
  - the d3.scaleTime() appears to be creating a scale in utc time which is no really usefull. I couldn't find a way to switch this to local time (at least). This should acctually take local time from the local zone searched.
## Contiene 
Aplicación de * Meteor * usando * REACT *. 

## Pasos para usar
- Clonar el repositorio
- Instalar meteor
- Usar en /

```
meteor npm install
meteor
```

## Licencia 
MIT

## Autor
Tomas F. Venegas Bernal

## Demo
[Buses](https://busesdificilusarencolombia.herokuapp.com/)

