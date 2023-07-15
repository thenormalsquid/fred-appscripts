/**
 * Returns FRED®-Data (Federal Reserve Economic Data) by Series-ID
 * 
 * @param {string} series_id
 * Example: "GDP" (Gross Domestic Product)
 * 
 * @param {boolean} parameter
 * 0 (default) = Current Value | 1 = All Values
 * 
 * @param {string} date_trunc
 * '' (default): 'yyyy-mm-dd'
 * 
 * @customfunction
 * @return an array
 */

function fredDATA(series_id, parameter, date_trunc) {

  var api_key = ''; // add api key here

  var http_response = UrlFetchApp.fetch('https://api.stlouisfed.org/fred/series/observations?' + 'series_id=' + series_id + '&api_key=' + api_key + '&file_type=json');

  var api_data = JSON.parse(http_response.getContentText());
  var results_array = [['Date', series_id]];
  var observations_array = api_data.observations;


  if (!parameter) {
    if (Number(api_data.observations[observations_array.length - 1]['value'])) {
      results_array.push([api_data.observations[observations_array.length - 1]['date'], Number(api_data.observations[observations_array.length - 1]['value'])]);
    };

    return results_array;
  }

  if (date_trunc) {
    observations_array = observations_array.slice(observations_array.findIndex((e) => {
      return e.date.includes(date_trunc);
    }));
  }
  
  for (i = 0; i < observations_array.length; i++) {
    if (Number(observations_array[i]['value'])) {
      results_array.push([observations_array[i]['date'], Number(observations_array[i]['value'])]);
    };
  };
 

  return results_array;
}
