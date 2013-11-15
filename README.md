# Bootstrap Combobox

We had need of a combobox at work and after looking around at the available options I was not happy with any of them.  The project had all it's styling based on Twitter's Bootstrap, so building on that made sense.

## How to use it

The dependencies are the Bootstrap stylesheet(CSS or LESS) and also the typeahead javascript plugin.  Include them and then the stylesheet(CSS or LESS) and javascript.

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

The combobox also has a "freeform" mode, which when activated, will allow the user to type in an option and submit it,
even if it isn't one of the selectable options in the list. To use it, simply pass a JSON option object with "freeform"
set to "true". Also, if you need to pass a freeform value back to the combobox control (for example, as a default, or
the result of a form post), you may do so by specifying an attribute of "data-value" on the select element of the
combobox:

    <select class="combobox" data-value="Arizona">
      <option></option>
      <option value="PA">Pennsylvania</option>
      <option value="CT">Connecticut</option>
      <option value="NY">New York</option>
      <option value="MD">Maryland</option>
      <option value="VA">Virginia</option>
    </select>

    <script type="text/javascript">
      $(document).ready(function(){
        $('.combobox').combobox({freeform: true});
      });
    </script>

## Live Example

http://dl.dropbox.com/u/21368/bootstrap-combobox/index.html
