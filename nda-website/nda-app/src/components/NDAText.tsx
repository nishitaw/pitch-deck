import React from 'react';

const NDAText: React.FC = () => {
  return (
    <div className="text-sm text-black bg-white border border-gray p-4 rounded-md max-h-60 overflow-y-auto mb-4">
      <h3 className="font-bold mb-2">NON-DISCLOSURE AGREEMENT</h3>

      <p className="mb-2">
        This Non-Disclosure Agreement (the "Agreement") is entered into by and between the company
        and the individual signing below ("Recipient").
      </p>

      <p className="mb-2">
        <strong>1. Confidential Information.</strong> "Confidential Information" means any information
        disclosed by the Company to Recipient, either directly or indirectly, in writing, orally or by
        inspection of tangible objects, including without limitation documents, business plans, source code,
        software, technical data, research, product plans, products, services, customers, markets, software,
        developments, inventions, processes, designs, drawings, engineering, hardware configuration,
        marketing materials or finances, which is designated as "Confidential," "Proprietary" or some
        similar designation, or information which should reasonably be considered confidential.
      </p>

      <p className="mb-2">
        <strong>2. Non-use and Non-disclosure.</strong> Recipient agrees not to use any Confidential
        Information for any purpose except to evaluate and engage in discussions concerning a potential
        business relationship between Recipient and Company. Recipient agrees not to disclose any
        Confidential Information to third parties or to employees, except to those employees who are
        required to have the information in order to evaluate or engage in discussions concerning the
        contemplated business relationship.
      </p>

      <p className="mb-2">
        <strong>3. Term.</strong> This Agreement shall remain in effect for a period of 5 years from
        the date of signing.
      </p>

      <p className="mb-2">
        <strong>4. Governing Law.</strong> This Agreement shall be governed by and construed in
        accordance with the laws of the jurisdiction in which the Company is located, without regard
        to conflicts of law principles.
      </p>

      <p>
        By signing below or by accessing the protected documents, Recipient acknowledges that they
        have read, understand, and agree to be bound by the terms of this Agreement.
      </p>
    </div>
  );
};

export default NDAText;
