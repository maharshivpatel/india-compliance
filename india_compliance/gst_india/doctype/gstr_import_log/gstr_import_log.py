# Copyright (c) 2022, Resilient Tech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class GSTRImportLog(Document):
    pass


def create_import_log(
    gstin,
    return_type,
    return_period,
    data_not_found=False,
    classification=None,
):
    frappe.enqueue(
        _create_import_log,
        queue="short",
        now=frappe.flags.in_test,
        gstin=gstin,
        return_type=return_type,
        return_period=return_period,
        data_not_found=data_not_found,
        classification=classification,
    )


def _create_import_log(
    gstin,
    return_type,
    return_period,
    data_not_found=False,
    classification=None,
):
    doctype = "GSTR Import Log"
    fields = {
        "gstin": gstin,
        "return_type": return_type,
        "return_period": return_period,
    }

    # TODO: change classification to gstr_category
    if classification:
        fields["classification"] = classification

    if log := frappe.db.get_value(doctype, fields):
        log = frappe.get_doc(doctype, log)
    else:
        log = frappe.get_doc({"doctype": doctype, **fields})

    log.data_not_found = data_not_found
    log.last_updated_on = frappe.utils.now()
    log.save(ignore_permissions=True)