# URL shortener
## Purpose
Write a server that acts as a bit.ly-like URL shortener. The primary interface should be a
JSON API that allows the following:
- Create a random short link for arbitrary URLs, e.g., bit.ly/2FhfhXh
- The same URL should always generate the same random shortlink
- Allow creating custom short links to arbitrary URLs, e.g., bit.ly/my-custom-link
- Provide a route for returning stats in a given short link, including:
    - When the short link was created
    - How many times the short link has been visited total
    - A histogram of number of visits to the short link per day
- Of course, the server itself should handle redirecting short links to the URLs it
creates

## Getting started
- clone the repo
- `npm i`
- `npm start`

### Sample Usage
    curl --location --request POST 'http://localhost:8080/shorten' \
    --header 'Content-Type: application/json' \
    --data-raw '{
	    "long_url": "http://www.google.com",
	    "custom_short_id": "my-custom-link-id"
    }'

    curl --location --request GET 'http://localhost:8080/my-custom-link-id' \

## Testing
- `npm test`

## Notes
- references to `id` or `bitlink` refers to the 2FhfhXh part of bit.ly/2FhfhXh
- generating an `id(bitlink)`: there are a few ways of doing this, whether it 
is to create a bijection function, converting to base64, uuid, etc. I chose
to use the naive solution of randomly generating a string of characters from a 
set of allowed characters because the amount of work required based on the requirements.
the id length of 7 was chosen because that was the length that was used by bit.ly.
The length depends on how frequently used the service is, how long before the id 
expires, etc. The assumption is that the usage would be more similar to bit.ly, 
so 7 was chosen
- The objects `longUrlToShort`, `shortUrlToLongUrl`, `stats` are stored in 
memory for this solution in order to avoid setting up a datastore. One of the 
requirements of this project
was to allow for easy setup by another developer. However, the ideal solution 
would be to have `longUrlToShort` and `shortUrlToLongUrl`
to be stored in Redis. `stats` would be stored in another nosql/sql solution. 
Each `id` created would be a record. The visit log in stats would be stored 
separately as a log or in a sql solution depending on how reporting will be 
done and/or how extensive analytics is
- checking whether or  not the custom link id provided is not built out
- domain is set as constant in this solution, but it is designed such that 
it can be changed in future development to be a variable, so that it can be set
by the customer as well since that seems to be a feature supported by bit.ly