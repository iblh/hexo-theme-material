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