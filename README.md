# Bootstrap Combobox

We had need of a combobox at work and after looking around at the available options I was not happy with any of them.  The project had all it's styling based on Twitter's Bootstrap, so building on that made sense.

# Looking for a new maintainer

I am looking for a new maintainer for this library if anyone is interested.  I have changed jobs and no longer use it in any projects.  It would be better served by being maintained by someone who uses it regularly.  If you are interested let me know by commenting on [this issue](https://github.com/danielfarrell/bootstrap-combobox/issues/124).

## How to use it

The dependencies are the Bootstrap stylesheet(CSS or LESS).  Include it and then the stylesheet(CSS or LESS) and javascript.

Then just activate the plugin on a normal select box(suggest having a blank option first):

    <select class="combobox">
      <option></option>
      <option value="PA">Pennsylvania</option>
      <option value="CT">Connecticut</option>
      <option value="NY">New York</option>
      <option value="MD">Maryland</option>
      <option value="VA">Virginia</option>
    </select>

    <script type="text/javascript">
      $(document).ready(function(){
        $('.combobox').combobox();
      });
    </script>

### Options

When activating the plugin, you may include an object containing options for the combobox

    $('.combobox').combobox({bsVersion: '2'});

`menu`: Custom markup for the dropdown menu list element.

`item`: Custom markup for the dropdown menu list items.

`matcher`: Custom function with one `item` argument that compares the item to the input. Defaults to matching on the query being a substring of the item, case insenstive

 `sorter`: Custom function that sorts a list `items` for display in the dropdown

 `highlighter`: Custom function for highlighting an `item`. Defaults to bolding the query within a matched item

 `template`: Custom function that returns markup for the combobox.

 `bsVersion`: Version of bootstrap being used. This is used by the default `template` function to generate markup correctly. Defaults to '3'. Set to '2' for compatibility with Bootstrap 2

## Live Example

### Bootstrap 2.0 Version
http://dl.dropbox.com/u/21368/bootstrap-combobox/index.html

### Bootstrap 3.0 Version
http://bootstrap-combobox-test.herokuapp.com/

## License

Licensed under the Apache License, Version 2.0
