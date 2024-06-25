///////////////// End Star Segments ....... !!!!	  
// Between seg 1 bb	
	switch (bseg1_side) {
    case 0:
		if(bseg1_bb!=0){
			for(n = start_seglen ; n < bseg1len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   }
		}
        break;
    case 1:
			if(bseg1_bb!=0){
			for(n = start_seglen ; n < bseg1len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}  
		break;
    case 2:
		if(bseg1_bb!=0){
        for(n = start_seglen ; n < bseg1len ; n += 50 ) {
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}   
	    break;
 } 
	// b seg 1 plants
	switch (bseg1_side) {
	case 0:
		 if(bseg1_plts!=0){	 			
		  for(n = start_seglen ; n < bseg1len ; n += 5 ) {
          addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		 }   
		break;
    case 1:
		if(bseg1_plts!=0){	
         for(n = start_seglen ; n < bseg1len ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
       	   }
		}
        break;
    case 2:
		if(bseg1_plts!=0){
		for(n = start_seglen ; n < bseg1len ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
		   addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		}
        break;
	
 } 
	
	switch (bseg1_side) {
	case 0:
		 if(bseg1_misc==1){
					 
		  for(n = start_seglen ; n < bseg1len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1)
       	   }
		 }
		 		
		if(bseg1_misc==2){
		    for(n = start_seglen ; n < bseg1len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
       	   }
		}
		
		if(bseg1_misc==3){
		  for(n = start_seglen ; n < bseg1len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
       	   }
		 
		 }
	  break;
		
		
    case 1:
		 if(bseg1_misc==1){
					 
		  for(n = start_seglen ; n < bseg1len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg1_misc==2){
		    for(n = start_seglen ; n < bseg1len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg1_misc==3){
		  for(n = start_seglen ; n < bseg1len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
    case 2:
				 if(bseg1_misc==1){
					 
		  for(n = start_seglen ; n < bseg1len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1);
		  addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg1_misc==2){
		    for(n = start_seglen ; n < bseg1len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg1_misc==3){
		  for(n = start_seglen ; n < bseg1len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
	
 } 
// End seg1 //////////////////////////////////	
// bseg 2
switch (bseg2_side) {
    case 0:
		if(bseg2_bb!=0){
			for(n = bseg1len ; n < bseg2len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   }
		}
        break;
    case 1:
			if(bseg2_bb!=0){
			for(n = bseg1len ; n < bseg2len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}  
		break;
    case 2:
		if(bseg2_bb!=0){
        for(n = bseg1len ; n < bseg2len ; n += 50 ) {
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}   
	    break;
 }

	switch (bseg2_side) {
	case 0:
		 if(bseg2_plts!=0){	 			
		  for(n = bseg1len ; n < bseg2len ; n += 5 ) {
          addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		 }   
		break;
    case 1:
		if(bseg2_plts!=0){	
         for(n = bseg1len ; n < bseg2len ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
       	   }
		}
        break;
    case 2:
		if(bseg2_plts!=0){
		for(n = bseg1len ; n < bseg2len ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
		   addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		}
        break;
	
 } 
	
	switch (bseg2_side) {
	case 0:
		 if(bseg2_misc==1){
					 
		  for(n = bseg1len ; n < bseg2len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1)
       	   }
		 }
		 		
		if(bseg2_misc==2){
		    for(n = bseg1len ; n < bseg2len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
       	   }
		}
		
		if(bseg2_misc==3){
		  for(n = bseg1len ; n < bseg2len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
       	   }
		 
		 }
	  break;
			
    case 1:
		 if(bseg2_misc==1){
					 
		  for(n = bseg1len ; n < bseg2len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg2_misc==2){
		    for(n = bseg1len ; n < bseg2len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg2_misc==3){
		  for(n = bseg1len ; n < bseg2len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
    case 2:
				 if(bseg2_misc==1){
					 
		  for(n = bseg1len ; n < bseg2len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1);
		  addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg2_misc==2){
		    for(n = bseg1len ; n < bseg2len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg2_misc==3){
		  for(n = bseg1len ; n < bseg2len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
	
 } 
// end seg2
// b seg3
switch (bseg3_side) {
    case 0:
		if(bseg3_bb!=0){
			for(n = bseg2len ; n < bseg3len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   }
		}
        break;
    case 1:
			if(bseg3_bb!=0){
			for(n = bseg2len ; n < bseg3len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}  
		break;
    case 2:
		if(bseg3_bb!=0){
        for(n = bseg2len ; n < bseg3len ; n += 50 ) {
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}   
	    break;
 }


	switch (bseg3_side) {
	case 0:
		 if(bseg3_plts!=0){	 			
		  for(n = bseg2len ; n < bseg3len ; n += 5 ) {
          addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		 }   
		break;
    case 1:
		if(bseg3_plts!=0){	
         for(n = bseg2len ; n < bseg3len ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
       	   }
		}
        break;
    case 2:
		if(bseg3_plts!=0){
		for(n = bseg2len ; n < bseg3len ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
		   addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		}
        break;
	
 } 
	
	switch (bseg3_side) {
	case 0:
		 if(bseg3_misc==1){
					 
		  for(n = bseg2len ; n < bseg3len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1)
       	   }
		 }
		 		
		if(bseg3_misc==2){
		    for(n = bseg2len ; n < bseg3len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
       	   }
		}
		
		if(bseg3_misc==3){
		  for(n = bseg2len ; n < bseg3len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
       	   }
		 
		 }
	  break;
			
    case 1:
		 if(bseg3_misc==1){
					 
		  for(n = bseg12en ; n < bseg3len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg3_misc==2){
		    for(n = bseg2len ; n < bseg3len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg3_misc==3){
		  for(n = bseg2len ; n < bseg3len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
    case 2:
				 if(bseg3_misc==1){
					 
		  for(n = bseg2len ; n < bseg3len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1);
		  addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg3_misc==2){
		    for(n = bseg2len ; n < bseg3len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg3_misc==3){
		  for(n = bseg2len ; n < bseg3len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
	
 } 
// end seg 3 
// b seg 4
switch (bseg4_side) {
    case 0:
		if(bseg4_bb!=0){
			for(n = bseg3len ; n < bseg4len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   }
		}
        break;
    case 1:
			if(bseg4_bb!=0){
			for(n = bseg3len ; n < bseg4len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}  
		break;
    case 2:
		if(bseg4_bb!=0){
        for(n = bseg3len ; n < bseg4len ; n += 50 ) {
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}   
	    break;
 }

	switch (bseg4_side) {
	case 0:
		 if(bseg4_plts!=0){	 			
		  for(n = bseg3len ; n < bseg4len ; n += 5 ) {
          addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		 }   
		break;
    case 1:
		if(bseg4_plts!=0){	
         for(n = bseg3len ; n < bseg4len ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
       	   }
		}
        break;
    case 2:
		if(bseg4_plts!=0){
		for(n = bseg3len ; n < bseg4len; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
		   addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		}
        break;
	
 } 
	
	switch (bseg4_side) {
	case 0:
		 if(bseg4_misc==1){
					 
		  for(n = bseg3len ; n < bseg4len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1)
       	   }
		 }
		 		
		if(bseg4_misc==2){
		    for(n = bseg3len ; n < bseg4len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
       	   }
		}
		
		if(bseg4_misc==3){
		  for(n = bseg3len ; n < bseg4len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
       	   }
		 
		 }
	  break;
			
    case 1:
		 if(bseg4_misc==1){
					 
		  for(n = bseg3len ; n < bseg4len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg4_misc==2){
		    for(n = bseg3len ; n < bseg4len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg4_misc==3){
		  for(n = bseg3len ; n < bseg4len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
    case 2:
				 if(bseg4_misc==1){
					 
		  for(n = bseg3len ; n < bseg4len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1);
		  addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg4_misc==2){
		    for(n = bseg3len ; n < bseg4len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg4_misc==3){
		  for(n = bseg3len ; n < bseg4len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
	
 } 	
// end seg 4
// b seg 5
switch (bseg5_side) {
    case 0:
		if(bseg5_bb!=0){
			for(n = bseg4len ; n < bseg5len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   }
		}
        break;
    case 1:
			if(bseg5_bb!=0){
			for(n = bseg4len ; n < bseg5len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}  
		break;
    case 2:
		if(bseg5_bb!=0){
        for(n = bseg4len ; n < bseg5len ; n += 50 ) {
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}   
	    break;
 }
	
	switch (bseg5_side) {
	case 0:
		 if(bseg5_plts!=0){	 			
		  for(n = bseg4len ; n < bseg5len ; n += 5 ) {
          addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		 }   
		break;
    case 1:
		if(bseg5_plts!=0){	
         for(n = bseg4len ; n < bseg5len ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
       	   }
		}
        break;
    case 2:
		if(bseg5_plts!=0){
		for(n = bseg4len ; n < bseg5len; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
		   addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		}
        break;
	
 } 
	
	switch (bseg5_side) {
	case 0:
		 if(bseg5_misc==1){
					 
		  for(n = bseg4len ; n < bseg5len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1)
       	   }
		 }
		 		
		if(bseg5_misc==2){
		    for(n = bseg4len ; n < bseg5len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
       	   }
		}
		
		if(bseg5_misc==3){
		  for(n = bseg4len ; n < bseg5len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
       	   }
		 
		 }
	  break;
			
    case 1:
		 if(bseg5_misc==1){
					 
		  for(n = bseg4len ; n < bseg5len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg5_misc==2){
		    for(n = bseg4len ; n < bseg5len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg5_misc==3){
		  for(n = bseg4len ; n < bseg5len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
    case 2:
				 if(bseg5_misc==1){
					 
		  for(n = bseg4len ; n < bseg5len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1);
		  addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg5_misc==2){
		    for(n = bseg4len ; n < bseg5len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg5_misc==3){
		  for(n = bseg4len ; n < bseg5len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
 } 	
// end Segment 5
// b seg 6
switch (bseg6_side) {
    case 0:
		if(bseg6_bb!=0){
			for(n = bseg5len ; n < bseg6len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   }
		}
        break;
    case 1:
			if(bseg6_bb!=0){
			for(n = bseg5len ; n < bseg6len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}  
		break;
    case 2:
		if(bseg6_bb!=0){
        for(n = bseg5len ; n < bseg6len ; n += 50 ) {
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}   
	    break;
 }

	switch (bseg6_side) {
	case 0:
		 if(bseg6_plts!=0){	 			
		  for(n = bseg5len ; n < bseg6len ; n += 5 ) {
          addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		 }   
		break;
    case 1:
		if(bseg6_plts!=0){	
         for(n = bseg5len ; n < bseg6len ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
       	   }
		}
        break;
    case 2:
		if(bseg6_plts!=0){
		for(n = bseg5len ; n < bseg6len; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
		   addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		}
        break;
	
 } 
	
	switch (bseg6_side) {
	case 0:
		 if(bseg6_misc==1){
					 
		  for(n = bseg5len ; n < bseg6len; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1)
       	   }
		 }
		 		
		if(bseg6_misc==2){
		    for(n = bseg5len ; n < bseg6len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
       	   }
		}
		
		if(bseg6_misc==3){
		  for(n = bseg5len ; n < bseg6len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
       	   }
		 
		 }
	  break;
			
    case 1:
		 if(bseg6_misc==1){
					 
		  for(n = bseg5len ; n < bseg6len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg6_misc==2){
		    for(n = bseg5len ; n < bseg6len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg6_misc==3){
		  for(n = bseg5len ; n < bseg6len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
    case 2:
		 if(bseg6_misc==1){
					 
		  for(n = bseg5len ; n < bseg6len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1);
		  addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg6_misc==2){
		    for(n = bseg5len ; n < bseg6len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg6_misc==3){
		  for(n = bseg5len ; n < bseg6len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
 } 	
// end seg 6
// b seg 7
switch (bseg7_side) {
    case 0:
		if(bseg7_bb!=0){
			for(n = bseg6len ; n < bseg7len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   }
		}
        break;
    case 1:
			if(bseg7_bb!=0){
			for(n = bseg6len ; n < bseg7len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}  
		break;
    case 2:
		if(bseg7_bb!=0){
        for(n = bseg6len ; n < bseg7len ; n += 50 ) {
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}   
	    break;
 }

	switch (bseg7_side) {
	case 0:
		 if(bseg7_plts!=0){	 			
		  for(n = bseg6len ; n < bseg7len ; n += 5 ) {
          addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		 }   
		break;
    case 1:
		if(bseg7_plts!=0){	
         for(n = bseg6len ; n < bseg7len ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
       	   }
		}
        break;
    case 2:
		if(bseg7_plts!=0){
		for(n = bseg6len ; n < bseg7len; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
		   addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		}
        break;
	
 } 
	
	switch (bseg7_side) {
	case 0:
		 if(bseg7_misc==1){
					 
		  for(n = bseg6len ; n < bseg7len; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1)
       	   }
		 }
		 		
		if(bseg7_misc==2){
		    for(n = bseg6len ; n < bseg7len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
       	   }
		}
		
		if(bseg7_misc==3){
		  for(n = bseg6len ; n < bseg7len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
       	   }
		 
		 }
	  break;
			
    case 1:
		 if(bseg7_misc==1){
					 
		  for(n = bseg6len ; n < bseg7len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg7_misc==2){
		    for(n = bseg6len ; n < bseg7len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg7_misc==3){
		  for(n = bseg6len ; n < bseg7len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
    case 2:
		 if(bseg7_misc==1){
					 
		  for(n = bseg6len ; n < bseg7len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1);
		  addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg7_misc==2){
		    for(n = bseg6len ; n < bseg7len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg7_misc==3){
		  for(n = bseg6len ; n < bseg7len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
 } 
// end seg 7
// B seg 8
switch (bseg8_side) {
    case 0:
		if(bseg8_bb!=0){
			for(n = bseg7len ; n < bseg8len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   }
		}
        break;
    case 1:
			if(bseg8_bb!=0){
			for(n = bseg7len ; n < bseg8len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}  
		break;
    case 2:
		if(bseg8_bb!=0){
        for(n = bseg7len ; n < bseg8len ; n += 50 ) {
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}   
	    break;
 }

	switch (bseg8_side) {
	case 0:
		 if(bseg8_plts!=0){	 			
		  for(n = bseg7len ; n < bseg8len ; n += 5 ) {
          addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		 }   
		break;
    case 1:
		if(bseg8_plts!=0){	
         for(n = bseg7len ; n < bseg8len ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
       	   }
		}
        break;
    case 2:
		if(bseg8_plts!=0){
		for(n = bseg7len ; n < bseg8len; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
		   addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		}
        break;
	
 } 
	
	switch (bseg8_side) {
	case 0:
		 if(bseg8_misc==1){
					 
		  for(n = bseg7len ; n < bseg8len; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1)
       	   }
		 }
		 		
		if(bseg8_misc==2){
		    for(n = bseg7len ; n < bseg8len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
       	   }
		}
		
		if(bseg8_misc==3){
		  for(n = bseg7len ; n < bseg8len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
       	   }
		 
		 }
	  break;
			
    case 1:
		 if(bseg8_misc==1){
					 
		  for(n = bseg7len ; n < bseg8len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg8_misc==2){
		    for(n = bseg7len ; n < bseg8len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg8_misc==3){
		  for(n = bseg7len ; n < bseg8len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
    case 2:
		 if(bseg8_misc==1){
					 
		  for(n = bseg7len ; n < bseg8len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1);
		  addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg8_misc==2){
		    for(n = bseg7len ; n < bseg8len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg8_misc==3){
		  for(n = bseg7len ; n < bseg8len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
 } 	
// end s 8 
// b sed 9
switch (bseg9_side) {
    case 0:
		if(bseg9_bb!=0){
			for(n = bseg8len ; n < bseg9len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   }
		}
        break;
    case 1:
			if(bseg9_bb!=0){
			for(n = bseg8len ; n < bseg9len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}  
		break;
    case 2:
		if(bseg9_bb!=0){
        for(n = bseg8len ; n < bseg9len ; n += 50 ) {
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}   
	    break;
 } 


	
	switch (bseg9_side) {
	case 0:
		 if(bseg9_plts!=0){	 			
		  for(n = bseg8len ; n < bseg9len ; n += 5 ) {
          addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		 }   
		break;
    case 1:
		if(bseg9_plts!=0){	
         for(n = bseg8len ; n < bseg9len ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
       	   }
		}
        break;
    case 2:
		if(bseg9_plts!=0){
		for(n = bseg8len ; n < bseg9len; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
		   addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		}
        break;
	
 } 
	
	switch (bseg9_side) {
	case 0:
		 if(bseg9_misc==1){
					 
		  for(n = bseg8len ; n < bseg9len; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1)
       	   }
		 }
		 		
		if(bseg9_misc==2){
		    for(n = bseg8len ; n < bseg9len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
       	   }
		}
		
		if(bseg9_misc==3){
		  for(n = bseg8len ; n < bseg9len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
       	   }
		 
		 }
	  break;
			
    case 1:
		 if(bseg9_misc==1){
					 
		  for(n = bseg8len ; n < bseg9len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg9_misc==2){
		    for(n = bseg8len ; n < bseg9len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg9_misc==3){
		  for(n = bseg8len ; n < bseg9len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
    case 2:
		 if(bseg9_misc==1){
					 
		  for(n = bseg8len ; n < bseg9len ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1);
		  addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg9_misc==2){
		    for(n = bseg8len ; n < bseg9len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg9_misc==3){
		  for(n = bseg8len ; n < bseg9len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
 } 	
// end seg 9
// b seg 10
switch (bseg10_side) {
    case 0:
		if(bseg10_bb!=0){
			for(n = bseg9len ; n < bseg10len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   }
		}
        break;
    case 1:
			if(bseg10_bb!=0){
			for(n = bseg9len ; n < bseg10len ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}  
		break;
    case 2:
		if(bseg10_bb!=0){
        for(n = bseg9len ; n < bseg10len ; n += 50 ) {
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}   
	    break;
 } 


	switch (bseg10_side) {
	case 0:
		 if(bseg10_plts!=0){	 			
		  for(n = bseg9len ; n < bseg10len ; n += 5 ) {
          addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		 }   
		break;
    case 1:
		if(bseg10_plts!=0){	
         for(n = bseg9len ; n < bseg10len ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
       	   }
		}
        break;
    case 2:
		if(bseg10_plts!=0){
		for(n = bseg9len ; n < bseg10len; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
		   addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		}
        break;
	
 } 
	
	switch (bseg10_side) {
	case 0:
		 if(bseg10_misc==1){
					 
		  for(n = bseg9len ; n < bseg10len; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1)
       	   }
		 }
		 		
		if(bseg10_misc==2){
		    for(n = bseg9len ; n < bseg10len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
       	   }
		}
		
		if(bseg10_misc==3){
		  for(n = bseg9len ; n < bseg10len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
       	   }
		 
		 }
	  break;
			
    case 1:
		 if(bseg10_misc==1){
					 
		  for(n = bseg9len ; n < bseg10len ; n += 5 ) {
          addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg10_misc==2){
		    for(n = bseg9len ; n < bseg10len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg10_misc==3){
		  for(n = bseg9len ; n < bseg10len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
    case 2:
		 if(bseg10_misc==1){
					 
		  for(n = bseg9len ; n < bseg10len ; n += 5 ) {
          addSprite(n,     SPRITES.CROPS, -1.1);
		  addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(bseg10_misc==2){
		    for(n = bseg9len ; n < bseg10len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(bseg10_misc==3){
		  for(n = bseg9len ; n < bseg10len ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
 } 	
// end s10 
// b end Segment !	 


switch (end_seg_side) {
    case 0:
		if(end_seg_bb!=0){
			for(n = bseg10len ; n < end_seglen-lastY()/segmentLength-1 ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   }
		}
        break;
    case 1:
			if(end_seg_bb!=0){
			for(n = bseg10len ; n < end_seglen-lastY()/segmentLength-1 ; n += 50 ) {
		  addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}  
		break;
    case 2:
		if(end_seg_bb!=0){
        for(n = bseg10len ; n < end_seglen-lastY()/segmentLength-1 ; n += 50 ) {
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);
		   addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);
		   }
		}   
	    break;
 } 


switch (end_seg_side) {
	case 0:
		 if(end_seg_plts!=0){	 			
		  for(n = bseg10len ; n < end_seglen-5 ; n += 5 ) {
          addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		 }   
		break;
    case 1:
		if(end_seg_plts!=0){	
         for(n = bseg10len ; n < end_seglen-5 ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
       	   }
		}
        break;
    case 2:
		if(end_seg_plts!=0){
		for(n = bseg10len ; n < end_seglen-5 ; n += 5 ) {
           addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), 1* (1.0 + Math.random()));
		   addSprite(n + Util.randomInt(0, 5), Util.randomChoice(SPRITES.PLANTS), -1* (1.0 + Math.random()));
       	   }
		}
        break;
	
 } 
	
	switch (end_seg_side) {
	case 0:
		 if(end_seg_misc==1){
					 
		  for(n = bseg10len ; n < end_seglen-3 ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1)
       	   }
		 }
		 		
		if(end_seg_misc==2){
		    for(n = bseg10len ; n < end_seglen-3; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
       	   }
		}
		
		if(end_seg_misc==3){
		  for(n = bseg10len ; n < end_seglen-3 ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
       	   }
		 
		 }
	  break;
			
    case 1:
		 if(end_seg_misc==1){
					 
		  for(n = bseg10len ; n < end_seglen-3 ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(end_seg_misc==2){
		    for(n = bseg10len ; n < end_seglen-5 ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(end_seg_misc==3){
		  for(n = bseg10len ; n < end_seglen-5 ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
    case 2:
				 if(end_seg_misc==1){
					 
		  for(n = bseg10len ; n < end_seglen-3 ; n += 3 ) {
          addSprite(n,     SPRITES.CROPS, -1.1);
		  addSprite(n,     SPRITES.CROPS, 1.1)
       	   }
		 }
		 		
		if(end_seg_misc==2){
		    for(n = bseg10len ; n < end_seglen-5 ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN, -1.1);
			addSprite(n,     SPRITES.COLUMN, 1.1);
       	   }
		}
		
		if(end_seg_misc==3){
		  for(n = bseg10len ; n < end_seglen-5 ; n += 5 ) {
			addSprite(n,     SPRITES.COLUMN2, -1.1);
			addSprite(n,     SPRITES.COLUMN2, 1.1);
       	   }
		 
		 }
	  break;
	
 }