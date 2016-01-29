*&---------------------------------------------------------------------*
*& Report  ZBE_CLOSED_CREDITS
*&
*&---------------------------------------------------------------------*
*&
*&
*&---------------------------------------------------------------------*

REPORT  zbe_closed_credits.

TABLES: proj, zbe_kredabschl, /asem/be_bewinst.

DATA: o_creditinfo    TYPE REF TO   zcl_be_ps_creditinfo,
      r_credits       TYPE LINE OF  zps_credit_ad_tt,
      t_credits       TYPE          zps_credit_ad_tt,
      r_s_dat         TYPE          zps_rng_gen_dat,
      t_s_dat         TYPE          zps_rng_gen_dat_tt,
      r_s_proj        TYPE          rng_pspid,
      t_s_proj        TYPE          /asem/rt_ps_proj,
      r_s_bewinst     TYPE          zps_rng_bewinst,
      t_s_bewinst     TYPE          zps_rng_bewinst_tt.


DATA: i_exclude       TYPE TABLE OF syucomm.

DATA: oref_dock TYPE REF TO cl_gui_docking_container,
      oref_alv  TYPE REF TO cl_gui_alv_grid.


SELECT-OPTIONS:
  so_proj FOR proj-pspid,
  so_dat  FOR zbe_kredabschl-gen_dat,
  so_gen  FOR /asem/be_bewinst-bew_inst.


AT SELECTION-SCREEN OUTPUT.
  APPEND 'ONLI' TO i_exclude.
  APPEND 'SJOB' TO i_exclude.
  APPEND 'PRIN' TO i_exclude.

  CALL FUNCTION 'RS_SET_SELSCREEN_STATUS'
    EXPORTING
      p_status  = sy-pfkey
      p_program = sy-repid
    TABLES
      p_exclude = i_exclude.




AT SELECTION-SCREEN.

  CHECK sy-ucomm = space.

  IF so_proj IS NOT INITIAL OR so_dat IS NOT INITIAL OR so_gen IS NOT INITIAL.
    CLEAR: t_s_proj, t_s_dat, t_s_bewinst, t_credits.
    APPEND LINES OF so_proj TO t_s_proj.
    APPEND LINES OF so_dat TO t_s_dat.
    APPEND LINES OF so_gen TO t_s_bewinst.

    CREATE OBJECT o_creditinfo.

    t_credits = o_creditinfo->get_kredite_ad( rng_proj = t_s_proj rng_date = t_s_dat rng_bewinst = t_s_bewinst ).


    IF oref_dock IS NOT BOUND.

      CREATE OBJECT oref_dock
        EXPORTING
          repid                       = sy-repid
          dynnr                       = '1000'
          side                        = cl_gui_docking_container=>dock_at_bottom
          ratio                       = 70
        EXCEPTIONS
          cntl_error                  = 1
          cntl_system_error           = 2
          create_error                = 3
          lifetime_error              = 4
          lifetime_dynpro_dynpro_link = 5
          OTHERS                      = 6.
      IF sy-subrc <> 0.
* MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
*            WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4.
      ENDIF.
    ENDIF.


    IF oref_alv IS NOT BOUND.

      CHECK oref_dock IS BOUND.
      CREATE OBJECT oref_alv
        EXPORTING
          i_parent          = oref_dock
        EXCEPTIONS
          error_cntl_create = 1
          error_cntl_init   = 2
          error_cntl_link   = 3
          error_dp_create   = 4
          OTHERS            = 5.
      IF sy-subrc <> 0.
* MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
*            WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4.
      ENDIF.


      CALL METHOD oref_alv->set_table_for_first_display
        EXPORTING
          i_structure_name              = 'ZPS_CREDIT_AD'
        CHANGING
          it_outtab                     = t_credits
        EXCEPTIONS
          invalid_parameter_combination = 1
          program_error                 = 2
          too_many_lines                = 3
          OTHERS                        = 4.
      IF sy-subrc <> 0.
* MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
*            WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4.
      ENDIF.



    ENDIF.


    CALL METHOD oref_alv->refresh_table_display
      EXCEPTIONS
        finished = 1
        OTHERS   = 2.
    IF sy-subrc <> 0.
* MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
*            WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4.
    ENDIF.


  ENDIF.
  
  
  
  
  
  AT SELECTION-SCREEN OUTPUT.
  APPEND 'ONLI' TO i_exclude.
  APPEND 'SJOB' TO i_exclude.
  APPEND 'PRIN' TO i_exclude.

  CALL FUNCTION 'RS_SET_SELSCREEN_STATUS'
    EXPORTING
      p_status  = sy-pfkey
      p_program = sy-repid
    TABLES
      p_exclude = i_exclude.


  gs_variant-report = sy-repid.
  x_save = 'A'. "layouts can only be saved as user specific ones

  APPEND cl_gui_alv_grid=>mc_fg_sort TO t_toolbar_excludes.
  APPEND cl_gui_alv_grid=>mc_mb_filter TO t_toolbar_excludes.
  APPEND cl_gui_alv_grid=>mc_mb_sum TO t_toolbar_excludes.
  "APPEND cl_gui_alv_grid=>mc_mb_variant TO t_toolbar_excludes.
  APPEND cl_gui_alv_grid=>mc_fc_graph TO t_toolbar_excludes.
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
*&---------------------------------------------------------------------*
*& Report  ZBE_CLOSED_CREDITS
*&
*&---------------------------------------------------------------------*
*&
*&
*&---------------------------------------------------------------------*

REPORT  zbe_closed_credits.

TABLES: proj, zbe_kredabschl, /asem/be_bewinst.

DATA: o_creditinfo    TYPE REF TO   zcl_be_ps_creditinfo,
      r_credits       TYPE LINE OF  zps_credit_ad_tt,
      t_credits       TYPE          zps_credit_ad_tt,
      r_s_dat         TYPE          zps_rng_gen_dat,
      t_s_dat         TYPE          zps_rng_gen_dat_tt,
      r_s_proj        TYPE          rng_pspid,
      t_s_proj        TYPE          /asem/rt_ps_proj,
      r_s_geninst     TYPE          zps_rng_bewinst,
      t_s_geninst     TYPE          zps_rng_bewinst_tt,
      r_s_bewinst     TYPE          zps_rng_bewinst,
      t_s_bewinst     TYPE          zps_rng_bewinst_tt.


DATA: i_exclude       TYPE TABLE OF syucomm.

DATA: oref_dock TYPE REF TO cl_gui_docking_container,
      oref_alv  TYPE REF TO cl_gui_alv_grid.

DATA: t_toolbar_excludes TYPE ui_functions,
      r_fieldcat         TYPE lvc_s_fcat,
      t_fieldcat         TYPE lvc_t_fcat.


DATA : idetails TYPE abap_compdescr_tab,
       xdetails TYPE abap_compdescr.


DATA : ref_table_des TYPE REF TO cl_abap_structdescr.

DATA: x_save, "for Parameter I_SAVE
      gs_variant TYPE disvariant. "for parameter IS_VARIANT


SELECT-OPTIONS:
  so_proj   FOR proj-pspid,
  so_dat    FOR zbe_kredabschl-gen_dat,
  so_gen    FOR /asem/be_bewinst-bew_inst MATCHCODE OBJECT zbe_binst,
  so_bew    FOR /asem/be_bewinst-bew_inst MATCHCODE OBJECT zbe_binst.


AT SELECTION-SCREEN OUTPUT.
  APPEND 'ONLI' TO i_exclude.
  APPEND 'SJOB' TO i_exclude.
  APPEND 'PRIN' TO i_exclude.

  CALL FUNCTION 'RS_SET_SELSCREEN_STATUS'
    EXPORTING
      p_status  = sy-pfkey
      p_program = sy-repid
    TABLES
      p_exclude = i_exclude.


  gs_variant-report = sy-repid.
  x_save = 'A'. "layouts can only be saved as user specific ones

  APPEND cl_gui_alv_grid=>mc_fg_sort TO t_toolbar_excludes.
  APPEND cl_gui_alv_grid=>mc_mb_filter TO t_toolbar_excludes.
  APPEND cl_gui_alv_grid=>mc_mb_sum TO t_toolbar_excludes.
  "APPEND cl_gui_alv_grid=>mc_mb_variant TO t_toolbar_excludes.
  APPEND cl_gui_alv_grid=>mc_fc_graph TO t_toolbar_excludes.


AT SELECTION-SCREEN.

  CHECK sy-ucomm = space.

  IF so_proj IS NOT INITIAL OR so_dat IS NOT INITIAL OR so_gen IS NOT INITIAL.
    CLEAR: t_s_proj, t_s_dat, t_s_bewinst, t_credits.
    APPEND LINES OF so_proj TO t_s_proj.
    APPEND LINES OF so_dat TO t_s_dat.
    APPEND LINES OF so_bew TO t_s_bewinst.
    APPEND LINES OF so_gen TO t_s_geninst.

    CREATE OBJECT o_creditinfo.

    t_credits = o_creditinfo->get_kredite_ad( rng_proj = t_s_proj rng_date = t_s_dat rng_geninst = t_s_geninst rng_bewinst = t_s_bewinst ).


    IF oref_dock IS NOT BOUND.

      CREATE OBJECT oref_dock
        EXPORTING
          repid                       = sy-repid
          dynnr                       = '1000'
          side                        = cl_gui_docking_container=>dock_at_bottom
          ratio                       = 70
        EXCEPTIONS
          cntl_error                  = 1
          cntl_system_error           = 2
          create_error                = 3
          lifetime_error              = 4
          lifetime_dynpro_dynpro_link = 5
          OTHERS                      = 6.
      IF sy-subrc <> 0.
* MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
*            WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4.
      ENDIF.
    ENDIF.


    IF oref_alv IS NOT BOUND.

      CHECK oref_dock IS BOUND.
      CREATE OBJECT oref_alv
        EXPORTING
          i_parent          = oref_dock
        EXCEPTIONS
          error_cntl_create = 1
          error_cntl_init   = 2
          error_cntl_link   = 3
          error_dp_create   = 4
          OTHERS            = 5.
      IF sy-subrc <> 0.
* MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
*            WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4.
      ENDIF.




* Get the structure of the table.
      ref_table_des ?= cl_abap_typedescr=>describe_by_name( 'ZPS_CREDIT_AD' ).

      LOOP AT ref_table_des->components INTO xdetails.

        r_fieldcat-fieldname = xdetails-name.
        r_fieldcat-col_opt = abap_true.
        APPEND r_fieldcat TO t_fieldcat.
      ENDLOOP.

      CALL METHOD oref_alv->set_table_for_first_display
        EXPORTING
          i_structure_name              = 'ZPS_CREDIT_AD'
          it_toolbar_excluding          = t_toolbar_excludes
          is_variant                    = gs_variant
          i_save                        = x_save
        CHANGING
          it_outtab                     = t_credits
          it_fieldcatalog               = t_fieldcat
        EXCEPTIONS
          invalid_parameter_combination = 1
          program_error                 = 2
          too_many_lines                = 3
          OTHERS                        = 4.
      IF sy-subrc <> 0.
* MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
*            WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4.
      ENDIF.


    ENDIF.



    CALL METHOD oref_alv->refresh_table_display
      EXCEPTIONS
        finished = 1
        OTHERS   = 2.
    IF sy-subrc <> 0.
* MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
*            WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4.
    ENDIF.


  ENDIF.
  
  
  
  
  
  
  
  
  
  
  
  
I_SAVE = SPACE
Kein Speichern von Layouts m�glich.
I_SAVE = 'U'
Der Benutzer kann nur benutzerspezifische Layouts speichern.
I_SAVE = 'X'
Der Benutzer kann nur �bergreifende Layouts speichern.
I_SAVE = 'A'
Der Benutzer kann sowohl benutzerspezifische als auch �bergreifende Layouts speichern.
  
  
  
  
  
  
  
  
  
  
  
  
  *&---------------------------------------------------------------------*
*& Report  ZBE_CLOSED_CREDITS
*&
*&---------------------------------------------------------------------*
*&
*&
*&---------------------------------------------------------------------*

REPORT  zbe_closed_credits.

TABLES: proj, zbe_kredabschl, /asem/be_bewinst.
TABLES: sscrfields.

DATA: o_creditinfo    TYPE REF TO   zcl_be_ps_creditinfo,
      r_credits       TYPE LINE OF  zps_credit_ad_tt,
      t_credits       TYPE          zps_credit_ad_tt,
      r_s_dat         TYPE          zps_rng_gen_dat,
      t_s_dat         TYPE          zps_rng_gen_dat_tt,
      r_s_proj        TYPE          rng_pspid,
      t_s_proj        TYPE          /asem/rt_ps_proj,
      r_s_geninst     TYPE          zps_rng_bewinst,
      t_s_geninst     TYPE          zps_rng_bewinst_tt,
      r_s_bewinst     TYPE          zps_rng_bewinst,
      t_s_bewinst     TYPE          zps_rng_bewinst_tt.


DATA: i_exclude       TYPE TABLE OF syucomm.

DATA: oref_dock TYPE REF TO cl_gui_docking_container,
      oref_alv  TYPE REF TO cl_gui_alv_grid.

DATA: t_toolbar_excludes TYPE ui_functions,
      r_fieldcat         TYPE lvc_s_fcat,
      t_fieldcat         TYPE lvc_t_fcat.


DATA : idetails TYPE abap_compdescr_tab,
       xdetails TYPE abap_compdescr.


DATA : ref_table_des TYPE REF TO cl_abap_structdescr.

DATA: x_save, "for Parameter I_SAVE
      gs_variant TYPE disvariant. "for parameter IS_VARIANT




SELECT-OPTIONS:
  so_proj   FOR proj-pspid,
  so_dat    FOR zbe_kredabschl-gen_dat,
  so_gen    FOR /asem/be_bewinst-bew_inst MATCHCODE OBJECT zbe_genin,
  so_bew    FOR /asem/be_bewinst-bew_inst MATCHCODE OBJECT zbe_bewin.





INITIALIZATION.
  "APPEND 'ONLI' TO i_exclude.
  APPEND 'SJOB' TO i_exclude.
  APPEND 'PRIN' TO i_exclude.

  CALL FUNCTION 'RS_SET_SELSCREEN_STATUS'
    EXPORTING
      p_status  = sy-pfkey
      p_program = sy-repid
    TABLES
      p_exclude = i_exclude.


  gs_variant-report = sy-repid.
  x_save = 'A'. "layouts can only be saved as user specific ones

  APPEND cl_gui_alv_grid=>mc_fg_sort TO t_toolbar_excludes.
  APPEND cl_gui_alv_grid=>mc_mb_filter TO t_toolbar_excludes.
  APPEND cl_gui_alv_grid=>mc_mb_sum TO t_toolbar_excludes.
  "APPEND cl_gui_alv_grid=>mc_mb_variant TO t_toolbar_excludes.
  APPEND cl_gui_alv_grid=>mc_fc_graph TO t_toolbar_excludes.



  IF oref_dock IS NOT BOUND.

    CREATE OBJECT oref_dock
      EXPORTING
        repid                       = sy-repid
        dynnr                       = '1000'
        side                        = cl_gui_docking_container=>dock_at_bottom
        ratio                       = 70
      EXCEPTIONS
        cntl_error                  = 1
        cntl_system_error           = 2
        create_error                = 3
        lifetime_error              = 4
        lifetime_dynpro_dynpro_link = 5
        OTHERS                      = 6.
    IF sy-subrc <> 0.
* MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
*            WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4.
    ENDIF.
  ENDIF.

  IF oref_alv IS NOT BOUND.

    CHECK oref_dock IS BOUND.
    CREATE OBJECT oref_alv
      EXPORTING
        i_parent          = oref_dock
      EXCEPTIONS
        error_cntl_create = 1
        error_cntl_init   = 2
        error_cntl_link   = 3
        error_dp_create   = 4
        OTHERS            = 5.
    IF sy-subrc <> 0.
* MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
*            WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4.
    ENDIF.



* Get the structure of the table.
    ref_table_des ?= cl_abap_typedescr=>describe_by_name( 'ZPS_CREDIT_AD' ).

    LOOP AT ref_table_des->components INTO xdetails.

      r_fieldcat-fieldname = xdetails-name.
      r_fieldcat-col_opt = abap_true.
      APPEND r_fieldcat TO t_fieldcat.
    ENDLOOP.

    CALL METHOD oref_alv->set_table_for_first_display
      EXPORTING
        i_structure_name              = 'ZPS_CREDIT_AD'
        it_toolbar_excluding          = t_toolbar_excludes
        is_variant                    = gs_variant
        i_save                        = x_save
      CHANGING
        it_outtab                     = t_credits
        it_fieldcatalog               = t_fieldcat
      EXCEPTIONS
        invalid_parameter_combination = 1
        program_error                 = 2
        too_many_lines                = 3
        OTHERS                        = 4.
    IF sy-subrc <> 0.
* MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
*            WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4.
    ENDIF.





  ENDIF.



* Hack: wrote data to memory and read data after ever initialization
* pressing f8 occures a initalization and so read data from memory
* and if something is in, then dispaly data. it occures in a short
* flickering
AT SELECTION-SCREEN OUTPUT.
*   import output table from the memory and free afterwards
  IMPORT data = t_credits FROM MEMORY ID sy-cprog.
  FREE MEMORY ID sy-cprog.

  IF t_credits IS NOT INITIAL.
    CALL METHOD oref_alv->refresh_table_display
      EXCEPTIONS
        finished = 1
        OTHERS   = 2.
    IF sy-subrc <> 0.
* MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
*            WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4.
    ENDIF.
  ENDIF.


AT SELECTION-SCREEN.
  CHECK sy-ucomm = space OR sy-ucomm = 'ONLI'.

  sscrfields-ucomm = 'ONLI'.

START-OF-SELECTION.

  IF so_proj IS NOT INITIAL OR so_dat IS NOT INITIAL OR so_gen IS NOT INITIAL.
    CLEAR: t_s_proj, t_s_dat, t_s_bewinst, t_credits.
    APPEND LINES OF so_proj TO t_s_proj.
    APPEND LINES OF so_dat TO t_s_dat.
    APPEND LINES OF so_bew TO t_s_bewinst.
    APPEND LINES OF so_gen TO t_s_geninst.

    CREATE OBJECT o_creditinfo.

    t_credits = o_creditinfo->get_kredite_abgs( rng_proj = t_s_proj rng_date = t_s_dat rng_geninst = t_s_geninst rng_bewinst = t_s_bewinst ).


*   export to memory
    EXPORT data = t_credits TO MEMORY ID sy-cprog.


  ENDIF.


END-OF-SELECTION.
  CALL METHOD oref_alv->refresh_table_display
    EXCEPTIONS
      finished = 1
      OTHERS   = 2.
  IF sy-subrc <> 0.
* MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
*            WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4.
  ENDIF.