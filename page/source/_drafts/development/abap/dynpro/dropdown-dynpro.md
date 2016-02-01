
PARAMETERS:
  bewinst AS LISTBOX VISIBLE LENGTH 25.
  
  
  
  
  AT SELECTION-SCREEN OUTPUT.
  DATA: r_bewinst TYPE /asem/be_bewinst,
        t_bewinst TYPE STANDARD TABLE OF /asem/be_bewinst.

  DATA:
    name TYPE vrm_id VALUE 'BEWINST',
    list TYPE vrm_values,
    value TYPE vrm_value.


  SELECT * FROM /asem/be_bewinst INTO TABLE t_bewinst.

  LOOP AT t_bewinst INTO r_bewinst.
    value-key = r_bewinst-bew_inst.
    value-text = r_bewinst-bez.
    APPEND value TO list.
  ENDLOOP.


  CALL FUNCTION 'VRM_SET_VALUES'
    EXPORTING
      id              = name
      values          = list
    EXCEPTIONS
      id_illegal_name = 0
      OTHERS          = 0.

