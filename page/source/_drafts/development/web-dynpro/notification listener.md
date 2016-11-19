public boolean readGesuch( java.lang.String gesuchID )  {
	//@@begin readGesuch()
	wdContext.currentGesuch_Request_AccessElement().setAccessType(BigDecimal.valueOf(2));

	wdContext.currentGesuchElement().setGesuchID(gesuchID);

	// set dummy data
	wdContext.currentGesuchElement().setPublikationEingang(true);
	wdContext.currentGesuchElement().setGebuehrenBezahlt(true);
	wdContext.currentGesuchElement().setGespraechTrotzAusschlussgrund(true);

	// read data
	executeGesuchAccess_Out();
	boolean success = wdContext.currentGesuch_Response_StandardElement().getResponseID().equals("00");

	if(success) {
		mapGesuchResponseToRequest();

		boolean betPersonSuccess = readGesuchBeteiligtePerson();

		wdThis.wdGetEinbuergerungsgespraechController().searchEinbuergerungsgespraechByGesuchID(wdContext.currentGesuchElement().getGesuchID());

		boolean empfSuccess = wdThis.wdGetEmpfehlungKommissionController().readEmpfehlungKommissionByGesuchID(wdContext.currentGesuchElement().getGesuchID());
		if(empfSuccess)
			wdThis.wdGetEmpfehlungKommissionController().mapSearchResponseToRequest();

		boolean antSuccess = wdThis.wdGetAntragGemeinderatController().readAntragGemeinderatByGesuchID(wdContext.currentGesuchElement().getGesuchID());
		if(antSuccess)
			wdThis.wdGetAntragGemeinderatController().mapSearchResponseToRequest();

		boolean entSuccess = wdThis.wdGetEntscheidGemeindeController().readEntscheidGemeindeByGesuchID(wdContext.currentGesuchElement().getGesuchID());
		if(entSuccess)
			wdThis.wdGetEntscheidGemeindeController().mapSearchResponseToRequest();

		boolean anfrageSuccess = wdThis.wdGetAnfrageController().searchByGesuchID(wdContext.currentGesuchElement().getGesuchID());

		boolean presave = wdThis.wdGetPresaveController().readPresaveByGesuchID(wdContext.currentGesuchElement().getGesuchID());
		if(!presave) {
			wdThis.wdGetPresaveController().savePresave();
		}

		boolean sistierung = wdThis.wdGetSistierungController().searchByGesuchId(wdContext.currentGesuchElement().getGesuchID());
		if(sistierung) {

		}

		boolean frist = wdThis.wdGetFristenkontrolleController().searchByGesuchID(wdContext.currentGesuchElement().getGesuchID());

		boolean dms = wdThis.wdGetDMSController().readDocumentsByGesuchID(wdContext.currentGesuchElement().getGesuchID());

		wdThis.wdGetKontaktdatenController().readKontaktdaten();


		wdContext.nodeGesuch().getNodeInfo().addNotificationListener(new GesuchNodeNotificationLister(wdContext.nodeGesuch()));
	}


	return success;
	//@@end
}








class GesuchNodeNotificationLister implements IWDNodeNotificationListener {

	IGesuchNode nodeGesuch = null;

	public GesuchNodeNotificationLister(IGesuchNode nodeGesuch) {
		this.nodeGesuch = nodeGesuch;
	}

	@Override
	public void notify(IWDNode notifiedNode, IWDNode notificationSource, Object payload) {
		executeGesuchAccess_Out();
		boolean success = wdContext.currentGesuch_Response_StandardElement().getResponseID().equals("00");

		if (success) {
			mapGesuchResponseToRequest();
		}
	}

}









wdThis.wdGetCantonCompController().wdGetContext().nodeGesuch().notifyAllMappedNodes(
	wdThis.wdGetGesuchController().wdGetContext().currentGesuchElement().getStatusID()
);
