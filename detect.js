function detect()
{   
   // Edit this number to detect larger groups.
     
   input = document.getElementById("story").value;
   
   input_lower = input.toLowerCase();
   
   input_lines = input_lower.split("\n");
   
   input_simplified = input_lines.map(function(x) { return x.replace(/[^a-z ]/g, ""); });
   
   input_lines_nonempty = input_simplified.filter(function(x) { return x.length > 0} );
   
   cliches_by_length = [];
   
   for (var cliche_length = max_cliche_length; cliche_length >= 1; cliche_length--)
   {      
      cliches_of_length_n = {};
      
      for (var li = 0; li < input_lines_nonempty.length; li++)
      {
         line = input_lines_nonempty[li];
         
         line_words = line.split(" ");
         
         if (line_words.length < cliche_length)
         {
            continue;
         }
         
         for (var wi = 0; wi <= (line_words.length - cliche_length); wi++)
         {
            sequence_get = [];
            
            for (var wiget = 0; wiget < cliche_length; wiget++)
            {
               sequence_get.push(line_words[wi+wiget]);
            }
            
            sequence_sentence = sequence_get.join(" ");
            
            if (sequence_sentence in cliches_of_length_n)
            {
               cliches_of_length_n[sequence_sentence]++;
            }
            else
            {
               cliches_of_length_n[sequence_sentence] = 1;
            }
         }
      }
      
      cliches_by_length[cliche_length] = cliches_of_length_n
   }

   output = "";
   
   for (var cliche_length = max_cliche_length; cliche_length >= 1; cliche_length--)
   {
      // Check there exists a group first.
      
      output_for_length = "";
      
      cliche_list = cliches_by_length[cliche_length];
      
      cliche_sentences = Object.keys(cliche_list);
            
      interesting_cliche_list = {};
      
      for (var si = 0; si < cliche_sentences.length; si++)
      {      
         sentence = cliche_sentences[si];
      
         frequency = cliche_list[sentence];
         
         if (frequency == 1) continue;
         
         interesting_cliche_list[sentence] = frequency;
      }
      
      if (interesting_cliche_list.length == 0) continue;
      
      output += "<h3>Groups of length " + cliche_length.toString() + "</h3>";
      
      output += "<div>";
      
      // Sort groups by frequency.
      interesting_cliche_sentences_sorted_by_frequency = Object.keys(interesting_cliche_list).sort(function(a,b){return interesting_cliche_list[b]-interesting_cliche_list[a]});
            
      for (var ici = 0; ici < interesting_cliche_sentences_sorted_by_frequency.length; ici++)
      {
         output += "<p>";
         
         sentence = interesting_cliche_sentences_sorted_by_frequency[ici];
                  
         frequency = interesting_cliche_list[sentence];
         
         output += "\"" + sentence + "\": " + frequency.toString();
 
         output += "</p>";
      }
      
      output += "</div>";
   }
   
   output_node = document.getElementById("results");
   
   output_node.innerHTML = output;
}
